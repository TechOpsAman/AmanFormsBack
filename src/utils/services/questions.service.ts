import axios from 'axios';
import { config } from '../../config';
// import { Task } from '../../compositor/compositor.interface';

export default class AnswersService {
  static api = `${config.questionsService.questionsCrudConnectionString}/api/questions`;

  //   static async create(headers: any, body: Record<string, any>): Promise<Task> {
  //     return axios
  //       .post(`${TaskService.api}`, body, headers)
  //       .then((res) => res.data);
  //   }
}
