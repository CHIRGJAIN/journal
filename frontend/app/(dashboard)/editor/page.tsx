'use client';

import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function EditorDashboard() {
    const [manuscripts, setManuscripts] = useState([]);
    const [selectedManuscript, setSelectedManuscript] = useState<string | null>(null);
    const [reviewerId, setReviewerId] = useState('');

    useEffect(() => {
        const fetchManuscripts = async () => {
            const token = localStorage.getItem('token');
            if (!token) return;

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/manuscripts`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.ok) {
                const data = await res.json();
                setManuscripts(data);
            }
        };
        fetchManuscripts();
    }, []);

    const handleAssign = async () => {
        if (!selectedManuscript || !reviewerId) return;
        const token = localStorage.getItem('token');

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews/assign`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ manuscriptId: selectedManuscript, reviewerId }),
        });

        if (res.ok) {
            alert('Reviewer assigned!');
            setSelectedManuscript(null);
            setReviewerId('');
        } else {
            alert('Failed to assign reviewer');
        }
    };

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Editor Dashboard</h1>

            <Card>
                <CardHeader>
                    <CardTitle>All Manuscripts</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableCaption>Manage submissions and reviews.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Author</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {manuscripts.map((m: any) => (
                                <TableRow key={m.id}>
                                    <TableCell className="font-medium">{m.title}</TableCell>
                                    <TableCell>{m.author?.name || 'Unknown'}</TableCell>
                                    <TableCell>{m.status}</TableCell>
                                    <TableCell className="text-right">
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button variant="outline" size="sm" onClick={() => setSelectedManuscript(m.id)}>Assign Reviewer</Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Assign Reviewer</DialogTitle>
                                                </DialogHeader>
                                                <div className="grid gap-4 py-4">
                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                        <Label htmlFor="reviewer">Reviewer ID</Label>
                                                        <Input id="reviewer" value={reviewerId} onChange={(e) => setReviewerId(e.target.value)} className="col-span-3" placeholder="Paste User ID" />
                                                    </div>
                                                </div>
                                                <Button onClick={handleAssign}>Assign</Button>
                                            </DialogContent>
                                        </Dialog>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
