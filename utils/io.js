const userController = require("../Controllers/user.controller");

module.exports = function (io) {
    io.on("connection", async(socket) => {
        console.log("client is connected", socket.id);

        socket.on("login", async(userName, cb) => {
            //유저정보 저장 (11.24)
            try {
                const user = await userController.saveUser(userName, socket.id);
                cb({ ok: true, data: user });
            }catch(error){
                cb({ ok: false, error: error.message });
            }
        });

        // 연결 끊김 관련 console log 추가 (11.24)
        socket.on("disconnected", () => {
            console.log("user is disconnected");
        });
    });
};