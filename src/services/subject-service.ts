import { CustomResponse } from "../utils/custom-response";
import { StatusCode as sc } from "../utils/status-code";

class SubjectService<T> {

    constructor(protected subjectModel: any) {}

    async findByTeacherId(teacherId: string): Promise<CustomResponse<T>> {
        try {
            const foundSubjects = await this.subjectModel.findAll({
                where: {
                    teacherUserId: teacherId
                },
            });
            return { statusCode: sc.Success, model: foundSubjects };
        } catch (error) {
            console.error(error);
            return { statusCode: sc.ServerError };
        }
    }
}

export { SubjectService };