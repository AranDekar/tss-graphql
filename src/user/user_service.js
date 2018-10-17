import User from './schemas/user_schema';

class UserService {
  static async findOrCreate(username, providerUserProfile) {
    let user = await User.findOne({ username }).exec();
    if (user) {
      return user;
    }
    user = new User(providerUserProfile);
    await user.save();
    return user;
  }

  static async setupSuperAdminUsers(emailAddress) {
    const user = await User.findByEmailAddress(emailAddress);
    if (user) {
      user.roles = ['user', 'admin'];
      await user.save();
    }
  }
}
export default UserService;
