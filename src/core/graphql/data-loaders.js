import DataLoader from 'dataloader';
import User from 'user/schemas/user_schema';

const dataloaders = () => ({
  users: new DataLoader(username => User.findOne({ username }).exec()),
});

export default dataloaders;
