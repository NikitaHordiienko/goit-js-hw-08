import { throttle } from 'lodash';

const feedbackFormEl = document.querySelector('.feedback-form');
const userEmailEl = document.querySelector('input[name="email"]');
const usersMessageEl = document.querySelector('textarea[name="message"]');

feedbackFormEl.addEventListener('input', throttle(event => {
    const usersDataToSave = { email: userEmailEl.value, message: usersMessageEl.value };
    localStorage.setItem("feedback-form-state", JSON.stringify(usersDataToSave))
}, 500));

feedbackFormEl.addEventListener('submit', event => {
    event.preventDefault();    
    console.log({ email: userEmailEl.value, message: usersMessageEl.value });
    feedbackFormEl.reset();
    localStorage.removeItem("feedback-form-state");    
});

const load = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

const usersData = load("feedback-form-state");
if (usersData) {
  userEmailEl.value = usersData.email;
  usersMessageEl.value = usersData.message;
};