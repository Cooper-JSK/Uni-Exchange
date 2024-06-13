const generateAvatarUrl = (username) => {
    return `https://api.dicebear.com/8.x/lorelei/svg?seed=${username}`;
};

export default generateAvatarUrl;
