'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function SubmitManuscriptPage() {
    const [title, setTitle] = useState('');
    const [abstract, setAbstract] = useState('');
    const [fileUrl, setFileUrl] = useState(''); // Mocking file upload
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        // In real app, upload file first, get URL
        const mockUrl = "https://example.com/manuscript.pdf";

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/manuscripts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ title, abstract, contentUrl: mockUrl }),
        });

        if (res.ok) {
            router.push('/author');
        } else {
            alert('Submission failed');
        }
    };

    return (
        <div className="p-8 max-w-2xl mx-auto">
            <Card>
                
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Title</Label>
                            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="abstract">Abstract</Label>
                            <Textarea id="abstract" value={abstract} onChange={(e) => setAbstract(e.target.value)} required />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="file">Manuscript File (PDF)</Label>
                            <Input id="file" type="file" disabled />
                            <p className="text-sm text-gray-500">File upload mocked for demo.</p>
                        </div>

                        <Button type="submit" className="w-full">Submit</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
