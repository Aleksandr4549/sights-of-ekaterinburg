import React, { useState, useEffect } from 'react';
import { Progress } from 'antd';
import 'antd/dist/antd.dark.css';

const LineProgressBar = () => {
  const [percent, setPercent] = useState<number>(0);

  useEffect(() => {
    let timer = setInterval(() => setPercent(percent => percent + 3), 20);
    return () => clearInterval(timer);
  }, []);

  return (
  <>
    <Progress
      strokeColor={{
        '0%': '#108ee9',
        '100%': '#87d068',
      }}
      percent={percent}
    />
  </>
  )
};

export default LineProgressBar;