module.exports = function (io) {
    io.on("connection", async(socket) => {
        console.log("client is connected", socket.id);

        // 연결 끊김 관련 console log 추가 (11.24)
        socket.on("disconnected", () => {
            console.log("user is disconnected");
        });
    });
};