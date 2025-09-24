import Newsletter from '../Model/Suscriber.js';

export const subscribeEmail = async (req, res) => {
  try {
    const existing = await Newsletter.findOne({ email: req.body.email });
    if (existing) {
      return res.status(400).json({ message: 'Email already subscribed' });
    }
    const entry = new Newsletter(req.body);
    await entry.save();
    res.status(201).json(entry);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteSubscriber = async (req, res) => {
  await Newsletter.findByIdAndDelete(req.params.id);
  res.json({ message: 'Subscriber deleted' });
};