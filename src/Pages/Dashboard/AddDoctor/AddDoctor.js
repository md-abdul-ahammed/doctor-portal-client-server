import { Button, Input, TextField } from '@mui/material';
import React, { useState } from 'react';

const AddDoctor = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState(null);
    const [success, setSuccess] = useState(false)

    const handleSubmit = e => {
        const formData = new FormData();
        e.preventDefault();
        if (!image) {
            return;
        }
        formData.append('name', name)
        formData.append('email', email)
        formData.append('image', image)

        fetch('http://localhost:5000/doctors', {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    setSuccess('doctor added successfully');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
    return (
        <div>
            <form onSubmit={handleSubmit} >
                <TextField
                    label="Name"
                    variant="standard"
                    onChange={e => setName(e.target.value)}
                    required
                    sx={{ width: "50%" }}
                />
                <br />
                <TextField
                    label="Email"
                    type="email"
                    onChange={e => setEmail(e.target.value)}
                    variant="standard"
                    required
                    sx={{ width: "50%" }}
                />
                <br />
                <label htmlFor="contained-button-file">
                    <Input
                        accept="image/*"
                        type="file"
                        onChange={e => setImage(e.target.files[0])}
                    />
                    <br />
                    <Button variant="contained" type="submit">
                        Upload
                    </Button>
                </label>
            </form>
            {
                success && <span style={{ color: 'green' }}>{success}</span>
            }
        </div>
    );
};

export default AddDoctor;