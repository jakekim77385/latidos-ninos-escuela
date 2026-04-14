/**
 * api/profiles.js — Vercel Serverless Function
 * Handles profile data using Vercel KV or in-memory (stateless fallback)
 * Since Vercel is stateless, this returns an empty profile set.
 * Profiles are stored in localStorage on the client side.
 */

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'GET') {
    return res.status(200).json({ profiles: [], activeId: null });
  }
  if (req.method === 'POST') {
    return res.status(200).json({ success: true });
  }
  return res.status(405).json({ error: 'Method not allowed' });
};
