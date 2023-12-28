import React , {useState}from 'react'
import { Button } from '@mantine/core';
import { Badge, NavLink } from '@mantine/core';
import { IconHome2, IconGauge, IconChevronRight, IconActivity, IconCircleOff } from '@tabler/icons-react';
import './Main.css';
export const Main = () => {
  const [message, setMessage] = useState('');

  const sendMessage = async () => {
    try {
      // Make a POST request to your backend API endpoint
      const response = await axios.post('YOUR_BACKEND_API_ENDPOINT', {
        message: message,
      });

      // Handle the response from the backend (you can update this part based on your backend response structure)
      console.log('Backend Response:', response.data);

      // Clear the input field after successful submission
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      // Handle error, show error message, etc.
    }
  };
  return (
    <div className='body'>
    <div className="content">
        <div className='MainTop'>
        <span>ChatUI</span>
        </div>
    <div className='iconFlash'>
    <svg xmlns="http://www.w3.org/2000/svg" width="304" height="453" viewBox="0 0 304 453" fill="none">
  <path d="M96.9677 285.612H15.5241C9.39882 285.612 4.86645 282.864 1.92703 277.369C-1.01239 271.875 -0.589048 266.503 3.19707 261.255L177.671 8.01901C180.256 4.53086 183.488 2.13847 187.366 0.841847C191.244 -0.454372 195.123 -0.253718 199.001 1.44381C202.879 2.98723 205.949 5.58027 208.212 9.22293C210.474 12.8656 211.282 16.755 210.636 20.8913L189.536 189.3H288.247C294.926 189.3 299.635 192.248 302.375 198.144C305.114 204.04 304.391 209.612 300.205 214.86L108.002 446.148C105.416 449.39 102.084 451.497 98.006 452.469C93.9278 453.441 90.1497 453.078 86.6717 451.381C83.0396 449.837 80.2308 447.321 78.2453 443.833C76.2603 440.345 75.514 436.455 76.0066 432.164L96.9677 285.612Z" fill="url(#paint0_linear_91_467)"/>
  <defs>
    <linearGradient id="paint0_linear_91_467" x1="152" y1="0" x2="152" y2="453" gradientUnits="userSpaceOnUse">
      <stop stop-color="#FBFBFF"/>
      <stop offset="1" stop-color="#CACAFF" stop-opacity="0"/>
    </linearGradient>
  </defs>
</svg>
    </div>
        <div className="chatFooter">
          <div className="inp">
            <input type="text" placeholder="Send Message"     onChange={(e) => setMessage(e.target.value)} />
            <Button variant="filled" color="green" size="md" radius="lg"   onClick={sendMessage} className="newButtonSubmit">Submit</Button>
          </div>
        </div>
      </div>
       <div className='Under'>
       <div className='UnderClass'>
       © 2023 Class2Code.
          </div>
          <div className='UnderHome'>
            Home Page
          </div>
          <div className='UnderLicense'>
          License
          </div>
          <div className='UnderTeamOfUse'>
          Team of Use
          </div>
          <div className='UnderPrivacy'>
          Privacy Policy
          </div>
        </div>
        </div>
  )
}
