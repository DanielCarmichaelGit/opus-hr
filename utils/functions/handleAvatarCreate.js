import fetchWrapper from "../API/fetchWrapper";

export default function handleAvatarCreate(
  hairColor,
  gender,
  name,
  avatarPrompt,
  useExisting
) {
  const payload = {
    hairColor,
    gender,
    name,
    avatarPrompt,
    useExisting,
  };

  const res = fetchWrapper(
    "/api/integrations/generate/generate-avatar",
    localStorage.getItem("OPUS-TOKEN"),
    "POST",
    { ...payload }
  ).then((res) => {
    return res;
  });

  return res;
}
