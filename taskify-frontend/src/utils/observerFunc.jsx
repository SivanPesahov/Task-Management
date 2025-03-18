import { useEffect } from "react";

const useIntersectionShow = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        } else {
          entry.target.classList.remove("show");
        }
      });
    });

    const hiddennElements = document.querySelectorAll(".hiddenn");
    hiddennElements.forEach((el) => observer.observe(el));

    return () => {
      hiddennElements.forEach((el) => observer.unobserve(el));
    };
  }, []);
};

export default useIntersectionShow;
