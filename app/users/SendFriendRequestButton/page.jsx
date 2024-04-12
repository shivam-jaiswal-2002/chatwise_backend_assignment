// SendFriendRequestButton.js

import React, { useState } from 'react';

const SendFriendRequestButton = ({ recipientEmail, onSendRequest }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSendRequest = async () => {
    setIsLoading(true);
    try {
      await onSendRequest(recipientEmail);
      console.log('Friend request sent successfully');
    } catch (error) {
      console.error('Failed to send friend request:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      className="bg-primary text-black px-4 py-2 rounded"
      onClick={handleSendRequest}
      disabled={isLoading}
    >
      {isLoading ? 'Sending...' : 'Send Friend Request'}
    </button>
  );
};

export default SendFriendRequestButton;
