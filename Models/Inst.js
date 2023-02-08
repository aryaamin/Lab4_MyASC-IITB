const client = require("./dtabase.js");

class Instinfo {
    constructor (inst_id) {
        this.inst_id = inst_id;
    }

    async getInstInfo() {
        const result = await client.query(`select name, dept_name from instructor where id = $1`,
        [this.inst_id]);

        return result.rows[0];
    }

    async getInstCurrCourses() {

        const sem = await client.query(`SELECT year, semester
                                         FROM reg_dates 
                                         WHERE start_time <= current_timestamp 
                                         ORDER BY start_time DESC 
                                         LIMIT 1`);

        console.log('gfdgfdfdzverb', this.inst_id);

        const result = await client.query(`with info0 as (select course.course_id, course.title from section
            inner join course on course.course_id = section.course_id
            where semester = $1 and year = $2) select info0.course_id, info0.title from info0 inner join
            teaches on info0.course_id = teaches.course_id where teaches.id = $3`, [sem.rows[0].semester, sem.rows[0].year, this.inst_id]);

        return result.rows;
    }


    async getInstPastCourses() {
        
        const sem = await client.query(`SELECT year, semester
                                         FROM reg_dates 
                                         WHERE start_time <= current_timestamp 
                                         ORDER BY start_time DESC 
                                         LIMIT 1`);

        const result = await client.query(`with info0 as (select course.course_id, course.title from section
            inner join course on course.course_id = section.course_id
            where semester != $1 and year != $2) select info0.course_id, info0.title from info0 inner join
            teaches on info0.course_id = teaches.course_id where teaches.id = $3`, [sem.rows[0].semester, sem.rows[0].year, this.inst_id]);

        // console.log('dbres', result)

        return result.rows;
    }

// async getRunningCourses() {
//     console.log('nnhnh')
    
//     const sem = await client.query(`SELECT year, semester
//                                      FROM reg_dates 
//                                      WHERE start_time <= current_timestamp 
//                                      ORDER BY start_time DESC 
//                                      LIMIT 1`);

//     const result = await client.query(`select section.course_id, course.title from section
//     inner join course on course.course_id = section.course_id
//     where semester = $1 and year = $2 and dept_name = $3`, [sem.rows[0].semester, sem.rows[0].year, this.deptname]);

//     console.log('yffyvdbres', result)

//     return result.rows;
// }

}

module.exports = Instinfo;
