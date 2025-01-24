import React from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button, MenuItem, CircularProgress } from "@mui/material";
import { useUploadVideoMutation } from "../../services/video.api";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

interface VideoFormInputs {
  title: string;
  access: "free" | "paid";
  description?: string;
  duration?: number;
  video: FileList;
}

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  access: yup
    .string()
    .oneOf(["free", "paid"], "Select 'free' or 'paid'")
    .required("Access is required"),
  video: yup.mixed().required("Video file is required"),
  description: yup.string().nullable(),
  duration: yup.number().nullable(),
});

const VideoUploadForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<VideoFormInputs>({
    resolver: yupResolver(schema),
  });

  const [uploadVideo, { isLoading }] = useUploadVideoMutation();

  const onSubmit = async (data: VideoFormInputs) => {
    const file = data.video[0]; // Access file from input
    const videoData = {
      title: data.title,
      access: data.access,
      description: data.description,
      duration: data.duration || null,
    };

    try {
      await uploadVideo({ data: videoData, file }).unwrap();
      toast.success("Video uploaded successfully!");
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
    >
      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Title *"
            error={!!errors.title}
            helperText={errors.title?.message}
          />
        )}
      />

      <Controller
        name="access"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            select
            label="Access *"
            error={!!errors.access}
            helperText={errors.access?.message}
          >
            <MenuItem value="free">Free</MenuItem>
            <MenuItem value="paid">Paid</MenuItem>
          </TextField>
        )}
      />

      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <TextField {...field} label="Description" multiline rows={4} />
        )}
      />

      <Controller
        name="duration"
        control={control}
        render={({ field }) => (
          <TextField {...field} type="number" label="Duration (seconds)" />
        )}
      />

      <input
        type="file"
        accept="video/*"
        onChange={(e) => setValue("video", e.target.files as FileList)}
        style={{ marginBottom: "1rem" }}
      />
      {errors.video && <p style={{ color: "red" }}>{errors.video.message}</p>}

      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={isLoading}
      >
        {isLoading ? <CircularProgress size={24} /> : "Upload Video"}
      </Button>
    </form>
  );
};

export default VideoUploadForm;
