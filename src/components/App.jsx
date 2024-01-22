import { useState } from 'react';
import { Section } from './Section/Section';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Statistics } from './Statistics/Statistics';
import { Notification } from './Notification/Notification';
import { ResetButton } from './RezetBtn/RezetBtn';

export const App = () => {
  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });
  const { good, bad, neutral } = feedback;
  const onClick = key => {
    setFeedback(prevFeedback => ({
      ...prevFeedback,
      [key]: prevFeedback[key] + 1,
    }));
  };

  const countTotal = () =>
    Object.values(feedback).reduce((acc, value) => acc + value, 0);

  const countPositivePercentage = () => {
    return countTotal() === 0
      ? '0%'
      : Math.round((good / countTotal()) * 100);
  };


  const onReset = () => {
    setFeedback({
      good: 0,
      neutral: 0,
      bad: 0,
    });
  };

  return (
    <>
      <Section title={'Please leave a feedback'}>
        <FeedbackOptions options={feedback} onLeaveFeedback={onClick} />
        {countTotal() === 0 ? (
          <Notification />
        ) : (
          <Section title={'Statistics'}>
            <Statistics
              good={good}
              bad={bad}
              neutral={neutral}
              total={countTotal()}
              positivePercentage={countPositivePercentage()}
            />
            <ResetButton onReset={onReset} />
          </Section>
        )}
      </Section>
    </>
  );
};
