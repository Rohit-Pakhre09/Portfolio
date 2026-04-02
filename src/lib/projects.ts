export type Project = {
  title: string;
  description: string;
  image: string;
  liveLink?: string;
  sourceLink: string;
};

export const projects: Project[] = [
  {
    title: "Smart Shelf",
    description:
      "A modern and scalable Learning Management System (LMS) built with React, Vite, and pnpm. Designed for performance, modularity, and ease of integration.",
    liveLink: "https://smart-shelf-desk.vercel.app/",
    sourceLink: "https://github.com/Rohit-Pakhre09/Smart-Shelf",
    image: "/images/Smart-Shelf.png",
  },
  {
    title: "Cipher",
    description:
      "A sleek real-time chat app enabling instant, smooth, and secure communication",
      liveLink: "https://cipher-web-chat.vercel.app/",
    sourceLink: "https://github.com/Rohit-Pakhre09/Cipher/",
    image: "/images/Cipher.png",
  },
  {
    title: "Work OS - ERP",
    description:
      "Work OS ERP is a modern role-based Employee Resource Planning platform for organizations to manage workforce operations in one place.",
    liveLink: "https://work-os-erp.vercel.app/",
    sourceLink: "https://github.com/Rohit-Pakhre09/Work-OS-ERP",
    image: "/images/Work-OS-ERP.png",
  },
  {
    title: "Tic Tac Toe",
    description:
      "A simple and interactive Tic Tac Toe game built with HTML, CSS, and JavaScript. Two players take turns placing 'X' and 'O' with automatic win and draw detection.",
    sourceLink: "https://github.com/Rohit-Pakhre09/Tic-Tac-Toe",
    image: "/images/Tic Tac Toe.png",
  },
  {
    title: "Planet E-commerce",
    description:
      "A responsive e-commerce landing page built with Tailwind CSS CLI and lightweight JavaScript, optimized for speed and simplicity.",
    sourceLink: "https://github.com/Rohit-Pakhre09/Planet-E-commerce",
    image: "/images/Tailwind E-commerce.png",
  },
  {
    title: "Urban Cart",
    description:
      "A modern React e-commerce app with CRUD, Axios-based JSON fetching, filtering and sorting, and a responsive Tailwind Light/Dark UI.",
    sourceLink: "https://github.com/Rohit-Pakhre09/Urban-Cart",
    image: "/images/Urban-Cart.png",
  },
  {
    title: "Urban Lodge",
    description:
      "A modern hotel booking app built with React and Redux Toolkit, featuring CRUD operations, JSON Server integration, theme persistence, and a responsive Tailwind UI.",
    sourceLink: "https://github.com/Rohit-Pakhre09/Hotel-Booking",
    image: "/images/Urban-Lodge.png",
  },
];
