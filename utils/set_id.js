module.exports = function (req , res) {

    if (typeof req.cookies.user_id === 'undefined') {
        user_id = getUniqueStr()
        console.log("set id");
        res.cookie('user_id', user_id, { maxAge: 1000 * 60 * 60 * 24, httpOnly: false });

        return user_id;
    } else {
        user_id = req.cookies.user_id;
        return user_id;
    }
}

function getUniqueStr(myStrong) {
    var strong = 1000;
    if (myStrong) strong = myStrong;
    return new Date().getTime().toString(16) + Math.floor(strong * Math.random()).toString(16)
}
