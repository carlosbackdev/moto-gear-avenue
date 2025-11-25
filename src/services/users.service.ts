
import { apiService } from './api.service';

class UsersService {
    async getUserName(userId: number): Promise<string> {
        return apiService.get<string>(`/users/name/${userId}`);
    }

}
export const usersService = new UsersService();