const screenWidth: number = window.innerWidth;

if (screenWidth < 400) {
  document.documentElement.style.setProperty("--font-size-xs", "12px");
  document.documentElement.style.setProperty("--font-size-sm", "16px");
  document.documentElement.style.setProperty("--font-size-md", "16px");
  document.documentElement.style.setProperty("--font-size-lg", "24px");
  document.documentElement.style.setProperty("--font-size-xl", "38px");
  document.documentElement.style.setProperty("--font-size-xxl", "40px");
} else if (screenWidth < 480) {
  document.documentElement.style.setProperty("--font-size-xs", "14px");
  document.documentElement.style.setProperty("--font-size-sm", "18px");
  document.documentElement.style.setProperty("--font-size-md", "20px");
  document.documentElement.style.setProperty("--font-size-lg", "30px");
  document.documentElement.style.setProperty("--font-size-xl", "48px");
  document.documentElement.style.setProperty("--font-size-xxl", "60px");
} else if (screenWidth < 768) {
  document.documentElement.style.setProperty("--font-size-xs", "16px");
  document.documentElement.style.setProperty("--font-size-sm", "20px");
  document.documentElement.style.setProperty("--font-size-md", "24px");
  document.documentElement.style.setProperty("--font-size-lg", "38px");
  document.documentElement.style.setProperty("--font-size-xl", "56px");
  document.documentElement.style.setProperty("--font-size-xxl", "80px");
} else if (screenWidth < 1200) {
  document.documentElement.style.setProperty("--font-size-xs", "18px");
  document.documentElement.style.setProperty("--font-size-sm", "22px");
  document.documentElement.style.setProperty("--font-size-md", "32px");
  document.documentElement.style.setProperty("--font-size-lg", "40px");
  document.documentElement.style.setProperty("--font-size-xl", "60px");
  document.documentElement.style.setProperty("--font-size-xxl", "140px");
} else {
  document.documentElement.style.setProperty("--font-size-xs", "20px");
  document.documentElement.style.setProperty("--font-size-sm", "24px");
  document.documentElement.style.setProperty("--font-size-md", "36px");
  document.documentElement.style.setProperty("--font-size-lg", "48px");
  document.documentElement.style.setProperty("--font-size-xl", "66px");
  document.documentElement.style.setProperty("--font-size-xxl", "160px");
}

export {};
