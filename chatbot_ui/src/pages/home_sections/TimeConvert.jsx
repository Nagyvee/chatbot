const TimeDifference = (postDate) => {
    const pastDate = new Date(postDate);
  
    pastDate.setHours(pastDate.getHours() + 2);
  
    const currentDate = new Date();
  
    const timeDifference = currentDate - pastDate;
  
    const minutesDifference = Math.floor(timeDifference / (1000 * 60));
    const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  
    //  months difference
    const yearsDifference = currentDate.getFullYear() - pastDate.getFullYear();
    const monthsDifference = yearsDifference * 12 + (currentDate.getMonth() - pastDate.getMonth());
  
    if (minutesDifference < 60) {
      return `${minutesDifference} minute(s) ago`;
    } else if (hoursDifference < 24) {
      return `${hoursDifference} hour(s) ago`;
    } else if (daysDifference < 30) {
      return `${daysDifference} day(s) ago`;
    } else if (monthsDifference < 12) {
      return `${monthsDifference} month(s) ago`;
    } else {
      return `${yearsDifference} year(s) ago`;
    }
  };
  
  export default TimeDifference;
  