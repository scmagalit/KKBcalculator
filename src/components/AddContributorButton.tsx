'use client';

type props = {
    onClick: () => void;
    title: string;
};

export default function AddContributorButton({ onClick, title }: props) {
    return (
        <button onClick={onClick} className="h-full  flex flex-col justify-center">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-8 h-full p-1 text-primary hover:text-white">
                <title>{title}</title>
                <path d="M11 5a3 3 0 11-6 0 3 3 0 016 0zM2.615 16.428a1.224 1.224 0 01-.569-1.175 6.002 6.002 0 0111.908 0c.058.467-.172.92-.57 1.174A9.953 9.953 0 018 18a9.953 9.953 0 01-5.385-1.572zM16.25 5.75a.75.75 0 00-1.5 0v2h-2a.75.75 0 000 1.5h2v2a.75.75 0 001.5 0v-2h2a.75.75 0 000-1.5h-2v-2z" />
            </svg>
        </button>
    );
}
