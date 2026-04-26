import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import service from "../../appwrite/services";
import { Button, Input, RTE, Select } from "../index";

function PostForm({ post }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  console.log("post: ", post);
  const {
    register,
    handleSubmit,
    watch,
    control,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    // mode: "onBlur",
    defaultValues: {
      title: post?.title || "",
      content: post?.content || "",
      slug: post?.$id || "",
      status: post?.status || "Active",
    },
  });

  const userid = useSelector((state) => state.userData && state.userData.$id);

  const slugTransform = (value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  };

  useEffect(() => {
    const subscription = watch((values, { name }) => {
      name === "title" && setValue("slug", slugTransform(values.title));
    });
    return () => subscription.unsubscribe();
  }, []);

  async function submit(data) {
    setIsSubmitting(true);
    console.log("data: ", data);
    try {
      if (post) {
        try {
          const file = data.image[0]
            ? await service.uploadFile(data.image[0])
            : null;
          if (file) {
            service.deleteFile(post.featuredImage);
            console.log("fileId: ", fileId);
          }
          const dbPost = await service.updatePost(post.$id, {
            ...data,
            featuredImage: file?.$Id || undefined,
          });

          if (dbPost) navigate("/");
        } catch (error) {
          console.error("PostForm.submit:: Unable to update::", error);
        }
      } else {
        try {
          const file = await service.uploadFile(data.image[0]);
          if (file) {
            const fileId = file.$id;
            console.log("fileId: ", fileId);
            const dbPost = await service.createPost({
              ...data,
              userid,
              featuredImage: fileId,
            });
            if (dbPost) navigate("/");
          }
        } catch (error) {
          console.error("PostForm.submit:: Unable to upload::", error);
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form noValidate className="postForm" onSubmit={handleSubmit(submit)}>
      <div className="left">
        <Input
          label="Title : "
          className="title"
          {...register("title", { required: "title need to be filled" })}
          placeholder="Title"
        />
        <Input
          label="Slug : "
          className="slug"
          {...register("slug", { required: "Slug needs to be filled" })}
          // required
          placeholder="Slug"
        />
        <RTE
          name="content"
          label="Content : "
          className="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="right">
        <Input
          label="Featured Image : "
          type="file"
          {...register("image")}
          accept="image/jpg,image/jpeg,image/png,image/gif"
        />
        <Select
          label="Status : "
          options={["Active", "Inactive"]}
          {...register("status")}
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : post ? "Update" : "Submit"}
        </Button>
      </div>
      {errors.title && <p>{errors.title.message}</p>}
      {errors.slug && <p>{errors.slug.message}</p>}
    </form>
  );
}

export default PostForm;
