const userController = require("../Controllers/user.controller");
const chatController = require("../Controllers/chat.controller");

module.exports = function (io) {
    io.on("connection", async(socket) => {
        console.log("client is connected", socket.id);

        socket.on("login", async(userName, cb) => {
            //유저정보 저장 (11.24)
            try {
                const user = await userController.saveUser(userName, socket.id);
                // 입장 시 시스템 메시지 (11.28)
                const welcomeMessage = {
                    chat: `${user.name} is joined to this room`,
                    user: { id: null, name: "system" },
                };
                io.emit("message", welcomeMessage);
                cb({ ok: true, data: user });
            }catch(error){
                cb({ ok: false, error: error.message });
            }
        });
        socket.on("sendMessage", async(message, cb) => {
            try{
                //유저찾기 socket id로 (11.28)
                const user = await userController.checkUser(socket.id);
                //메세지 저장 (11.28)
                const newMessage = await chatController.saveChat(message, user);
                io.emit("message", newMessage);
                cb({ok:true});
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