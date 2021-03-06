import User from '../models/user';
import Notification from '../schemas/Notification';

class NotificationController {
  async update(req, res) {
    // const notifications = await Notification.findById(req.params.id);
    const notifications = await Notification.findByIdAndUpdate(
      req.params.id,
      {
        read: true,
      },
      { new: true }
    );
    return res.json(notifications);
  }

  async index(req, res) {
    const checkisProvider = await User.findOne({
      where: { id: req.userId, provider: true },
    });

    if (!checkisProvider) {
      return res
        .status(401)
        .json({ error: 'Only providers can load notifications' });
    }

    const notifications = await Notification.find({
      user: req.userId,
    })
      .sort({ createdAt: 'desc' })
      .limit(20);
    return res.json(notifications);
  }
}

export default new NotificationController();
