const Url = require('../models/url');
const { generateId } = require('../utils/nanoid');

exports.createUrl = async (req, res) => {
  try {
    const { longUrl, expirationDate, maxClicks } = req.body;
    const userId = req.user.id;
    const shortUrl = generateId(8);
    const url = new Url({
      longUrl,
      shortUrl,
      userId,
      expirationDate,
      maxClicks,
    });

    await url.save();

    res.status(201).json({
      shortUrl,
      createdAt: url.createdAt,
      expirationDate: url.expirationDate,
      maxClicks: url.maxClicks,
      clicks: url.clicks,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getUrl = async (req, res) => {
  try {
    const { shortUrl } = req.params;
    const url = await Url.findOne({ shortUrl });

    if (!url) {
      return res.status(404).json({ message: 'URL not found' });
    }

    if (url.expirationDate < new Date()) {
      return res.status(410).json({ message: 'URL has expired' });
    }

    if (url.maxClicks && url.clicks >= url.maxClicks) {
      return res.status(410).json({ message: 'URL has reached maximum clicks' });
    }

    url.clicks++;
    await url.save();

    res.status(200).json({ longUrl: url.longUrl });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getUserUrls = async (req, res) => {
  try {
    const urls = await Url.find({ userId: req.user.id });
    res.status(200).json({ urls });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteUrl = async (req, res) => {
  try {
    const { shortUrl } = req.params;
    const url = await Url.findOne({ shortUrl });
    if (!url) {
      return res.status(404).json({ message: 'URL not found' });
    }

    if (url.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You are not authorized to delete this URL' });
    }

    await url.deleteOne();
    res.status(200).json({ message: 'URL deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getUrlAnalytics = async (req, res) => {
  try {
    const { shortUrl } = req.params;
    const url = await Url.findOne({ shortUrl });

    if (!url) {
      return res.status(404).json({ message: 'URL not found' });
    }

    res.status(200).json({
      clicks: url.clicks,
      createdAt: url.createdAt,
      expirationDate: url.expirationDate,
      maxClicks: url.maxClicks,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};