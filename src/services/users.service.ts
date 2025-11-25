import { apiService } from './api.service';
import { ChangePasswordRequest, ChangePasswordResponse } from '@/types/models';

class UsersService {
    async getUserName(userId: number): Promise<string> {
        return apiService.get<string>(`/users/name/${userId}`);
    }

    async changePassword(email: string, newPassword: string): Promise<ChangePasswordResponse> {
        return apiService.post<ChangePasswordResponse>(
            `/users/chage/password?email=${encodeURIComponent(email)}&newPassword=${encodeURIComponent(newPassword)}`,
            {},
            true
        );
    }
}
export const usersService = new UsersService();