export default async function handler(req, res) {
    let { username } = req.query;

    if (!username) {
        return res.status(400).json({ error: 'Username required' });
    }

    username = username.trim()
        .replace(/https?:\/\/(www\.)?instagram\.com\//, '')
        .replace(/\/$/, '')
        .split('?')[0];

    try {
        const response = await fetch('https://instagram-scraper-stable-api.p.rapidapi.com/get_ig_user_posts.php', {
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'x-rapidapi-host': 'instagram-scraper-stable-api.p.rapidapi.com',
                'x-rapidapi-key': '21ebe20998msh95a8428dd433cb4p1db3fdjsne76e8f337805'
            },
            body: new URLSearchParams({
                username_or_url: username,
                amount: '12'
            })
        });

        const data = await response.json();
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch posts' });
    }
}
