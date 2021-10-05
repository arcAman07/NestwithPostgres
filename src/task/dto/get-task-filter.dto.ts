/* eslint-disable prettier/prettier */
import { TaskStatus } from '../task-status.enum';
export class GetTaskFilter {
  status?: TaskStatus; // ? symbolizes that its an optional parameter and not required
  search?: string;
}
