import './globals.css';

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
        <html lang="en" className="bg-gray-50">
            <body className="h-full">
                {children}
            </body>
        </html>
    );
}
