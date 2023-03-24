import './globals.css';
import LoginPage from "@/app/login";

export const metadata = {
    title: 'wECG Login',
    description:
        'Hospital Dashboard'
};

export default async function RootLayout({children
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="h-full">
                {children}
            </body>
        </html>
    );
}
