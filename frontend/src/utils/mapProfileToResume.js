export function mapProfileToResume(profile) {
  if (!profile) return {};

  return {
    name: profile.name || "",
    email: profile.email || "",
    phone: profile.phone || "",
    address: profile.address || "",
    about: profile.about || "",
    title: profile.title || "",

    // Convert array → string for textarea binding
    skills: Array.isArray(profile.skills)
      ? profile.skills.join(", ")
      : profile.skills || "",

    // Convert experience array → multiline string
    experience: Array.isArray(profile.experience)
      ? profile.experience
          .map(
            (exp) =>
              `${exp.role || ""} at ${exp.company || ""} (${exp.duration || ""}) - ${exp.description || ""}`
          )
          .join("\n")
      : profile.experience || "",

    education:
      profile.education?.map((edu) => ({
        degree: edu.degree || "",
        institution: edu.institution || "",
        year: edu.year || "",
        percentage: edu.percentage || "",
      })) || [{ degree: "", institution: "", year: "", percentage: "" }],

    projects:
      profile.projects?.map((proj) => ({
        name: proj.title || "",
        description: proj.description || "",
        link: proj.link || "",
      })) || [{ name: "", description: "", link: "" }],

    certificates:
      profile.certificates?.map((cert) => ({
        name: cert.name || "",
        issuer: cert.issuer || "",
      })) || [{ name: "", issuer: "" }],

    links:
      profile.social?.map((s) => ({
        label: s.platform || "",
        url: s.link || "",
      })) || [{ label: "", url: "" }],
  };
}
