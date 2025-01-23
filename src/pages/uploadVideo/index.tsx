import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, MenuItem, Box } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Define the schema using yup
const schema = yup.object().shape({
  title: yup.string().required('Title is required'),
  access: yup.string().oneOf(['free', 'paid']).required('Access is required'),
  url: yup.string().url('Must be a valid URL').required('URL is required'),
  description: yup.string(),
  hlsUrl: yup.string().url('Must be a valid URL'),
  duration: yup.number().positive('Duration must be positive'),
  public_id: yup.string(),
});

interface IFormInput {
  title: string;
  description?: string;
  url: string;
  hlsUrl?: string;
  duration?: number;
  access: 'free' | 'paid';
  public_id?: string;
}

const VideoUploadForm: React.FC = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: IFormInput) => {
    console.log(data);
    // Handle form submission
  };

  return (
    <Box
      component="form"
      noValidate
      sx={{ mt: 3 }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name="title"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="Title"
            fullWidth
            margin="normal"
            error={!!errors.title}
            helperText={errors.title ? errors.title.message : ''}
          />
        )}
      />

      <Controller
        name="access"
        control={control}
        defaultValue="free"
        render={({ field }) => (
          <TextField
            {...field}
            label="Access"
            select
            fullWidth
            margin="normal"
            error={!!errors.access}
            helperText={errors.access ? errors.access.message : ''}
          >
            <MenuItem value="free">Free</MenuItem>
            <MenuItem value="paid">Paid</MenuItem>
          </TextField>
        )}
      />

      <Controller
        name="url"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="URL"
            fullWidth
            margin="normal"
            error={!!errors.url}
            helperText={errors.url ? errors.url.message : ''}
          />
        )}
      />

      <Controller
        name="description"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="Description"
            fullWidth
            margin="normal"
            error={!!errors.description}
            helperText={errors.description ? errors.description.message : ''}
          />
        )}
      />

      <Controller
        name="hlsUrl"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="HLS URL"
            fullWidth
            margin="normal"
            error={!!errors.hlsUrl}
            helperText={errors.hlsUrl ? errors.hlsUrl.message : ''}
          />
        )}
      />

      <Controller
        name="duration"
        control={control}
        defaultValue={0}
        render={({ field }) => (
          <TextField
            {...field}
            label="Duration"
            type="number"
            fullWidth
            margin="normal"
            error={!!errors.duration}
            helperText={errors.duration ? errors.duration.message : ''}
          />
        )}
      />

      <Controller
        name="public_id"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="Public ID"
            fullWidth
            margin="normal"
            error={!!errors.public_id}
            helperText={errors.public_id ? errors.public_id.message : ''}
          />
        )}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 3, mb: 2 }}
      >
        Upload Video
      </Button>
    </Box>
  );
};

export default VideoUploadForm;
