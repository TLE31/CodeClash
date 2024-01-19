import React, { useState } from "react";

const MessageBox = () => {
  const [message, setMessage] = useState("");
  return (
    <div>
      <form>
        <div>
          {/* <label>Password</label> */}
          <input
            type="text"
            placeholder="send message"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
        </div>
        <button
          type="submit"
          className="btn"
          onClick={() => console.log("send")}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default MessageBox;
