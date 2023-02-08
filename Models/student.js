const client = require("./dtabase");
const Course = require("./course.js");

class Student {
    constructor (id) {
        this.id = id;
    }

    getId() {
        return this.id;
    }

    async getInfo() {
        const result = await client.query(`SELECT id, name, dept_name, tot_cred 
                                         FROM student 
                                         WHERE id = $1`, [this.id]);

        return result.rows[0];
    }

    async getCurrentSem() {
        const result = await client.query(`SELECT year, semester
                                         FROM reg_dates 
                                         WHERE start_time <= current_timestamp 
                                         ORDER BY start_time DESC 
                                         LIMIT 1`);
                                        return result.rows[0];
    }

    async getCourses() {
        const sem = await this.getCurrentSem();

        const result = await client.query(`SELECT t.course_id, t.sec_id, r.year, r.semester, c.title 
                                         FROM takes t 
                                         JOIN reg_dates r
                                         ON (r.semester = t.semester AND r.year = t.year)
                                         JOIN course c
                                         ON (c.course_id = t.course_id)
                                         WHERE id = $1
                                         ORDER BY r.start_time ASC`, [this.id]);
                                         
        const current = result.rows.filter((c) => (c.semester === sem.semester && c.year === sem.year));
        const past = result.rows.filter((c) => (c.semester != sem.semester || c.year != sem.year));

        return {"sem" : sem, "current" : current, "past" : past};
    }

    async dropCourse(id, course_id, sem, year) {
        // const sem = await this.getCurrentSem();

        const result1 = await client.query(`DELETE 
                                         FROM takes
                                         WHERE id = $1 AND semester = $2 AND year = $3`, [id, sem, year]);

        const credits = await client.query(`SELECT credits
                                          FROM course
                                          WHERE course_id = $1`, [course_id]);

        const result2 = await client.query(`UPDATE student
                                          SET tot_cred = tot_cred - $1 
                                          WHERE id = $2`, [credits["credits"], id]);
    }

    async registerCourse(course_id, sec_id) {
        const courses = await this.getCourses();
        const sem = courses["sem"];
        const curr_courses = courses["current"];
        const past_courses = courses["past"];

        const course = new Course(course_id);
        let prereqs = course.getPrereqs();

        for (const prereq of prereqs) {
            let found = false;

            for (const past_course of past_courses) {
                if (past_course["course_id"] == prereq["course_id"]) {
                    found = true;
                    break;
                }
            }

            if (!found) {
                return {"status" : 1, "value" : prereq["course_id"]};
            }
        }

        let slot = await course.getSlot(sec_id, sem.semester, sem.year);
        for (const course of curr_courses) {
            let course_obj = new Course(course["course_id"]);

            let course_slot = await course_obj.getSlot(course["sec_id"], sem.semester, sem.year);

            if (course_slot == slot) {
                return {"status" : 2, "value" : course["course_id"]};
            }
        }

        return {"status" : 0};
    }


}

module.exports = Student;
