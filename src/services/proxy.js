export default async function handler(req, res) {
  const response = await fetch(`${process.env.API_BASE}/endpoint`, {
    headers: {
      'Authorization': `Bearer ${process.env.API_KEY}`
    }
  });
  const data = await response.json();
  res.status(200).json(data);
}zxc vbnm   4op'