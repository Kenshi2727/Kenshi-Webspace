import React, { useMemo } from "react";

const PRIVACY_POLICY = {
    title: "Privacy Policy",
    lastUpdated: "January 2026",
    intro:
        "Welcome to Kenshi Webspace. Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you use our website, applications, and services. By accessing or using Kenshi Webspace, you agree to the practices described in this policy.",
    sections: [
        {
            id: "information-collection",
            heading: "1. Information We Collect",
            subsections: [
                {
                    title: "Personal Information",
                    content: [
                        "Name",
                        "Email address",
                        "Account details",
                        "Content you submit such as forms, or notes"
                    ]
                },
                {
                    title: "Technical & Usage Information",
                    content: [
                        // "IP address",
                        "Browser type and device information",
                        "Pages visited and actions taken",
                        "Date and time of access"
                    ],
                    description:
                        "This information helps us understand how users interact with Kenshi Webspace."
                }
            ]
        },
        {
            id: "usage",
            heading: "2. How We Use Your Information",
            content: [
                "Provide and maintain our services",
                "Improve performance and user experience",
                "Personalize features and content",
                "Communicate important updates or support messages",
                "Ensure security and prevent misuse"
            ],
            note: "We do not sell your personal data !"
        },
        {
            id: "cookies",
            heading: "3. Cookies & Tracking Technologies",
            content: [
                "Remember user preferences",
                "Improve site functionality",
                "Analyze traffic and usage patterns"
            ],
            note: "You can control cookies through your browser settings."
        },
        {
            id: "security",
            heading: "4. Data Security",
            content: [
                "Secure servers",
                "Restricted access to sensitive data",
                "Industry-standard security practices",
                "Authentication using CLerk Library"
            ],
            note: "No method of transmission over the internet is 100% secure !"
        },
        {
            id: "third-parties",
            heading: "5. Third-Party Services",
            content:
                "We may use trusted third-party services such as APIs, hosting providers, or analytics tools. These third parties have their own privacy policies, and Kenshi Webspace is not responsible for their practices."
        },
        {
            id: "retention",
            heading: "6. Data Retention",
            content:
                "We retain personal information only for as long as necessary to fulfill the purposes outlined in this policy."
        },
        {
            id: "rights",
            heading: "7. Your Rights",
            content: [
                "Access your personal data",
                "Request correction or deletion",
                "Withdraw consent where applicable"
            ]
        },
        {
            id: "children",
            heading: "8. Children’s Privacy",
            content:
                "Kenshi Webspace is not intended for children under the age of 13. We do not knowingly collect personal data from children.",
            note: "Sexual content is strictly prohibited on Kenshi Webspace and may lead to immediate account termination !"
        },
        {
            id: "changes",
            heading: "9. Changes to This Policy",
            content:
                'We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated "Last updated" date.'
        },
        {
            id: "contact",
            heading: "10. Contact Us",
            content: {
                organization: "Kenshi Webspace",
                email: "kenshi-webspace@gmail.com"
            }
        }
    ]
};

const SectionContent = ({ section }) => {
    // Render section which may have subsections, array content, or string content
    if (section.subsections && Array.isArray(section.subsections)) {
        return (
            <div className="space-y-6">
                {section.subsections.map((ss, i) => (
                    <article key={ss.title + i} className="space-y-2">
                        <h3 className="text-lg font-semibold text-white">{ss.title}</h3>
                        {ss.description && (
                            <p className="text-white/80">{ss.description}</p>
                        )}
                        {Array.isArray(ss.content) ? (
                            <ul className="list-disc list-inside text-white/85 ml-2 space-y-1">
                                {ss.content.map((item, idx) => (
                                    <li key={idx}>{item}</li>
                                ))}
                            </ul>
                        ) : ss.content ? (
                            <p className="text-white/85">{ss.content}</p>
                        ) : null}
                    </article>
                ))}
            </div>
        );
    }

    if (Array.isArray(section.content)) {
        return (
            <ul className="list-disc list-inside text-white/85 space-y-1">
                {section.content.map((c, i) => (
                    <li key={i}>{c}</li>
                ))}
            </ul>
        );
    }

    if (typeof section.content === "string") {
        return <p className="text-white/85">{section.content}</p>;
    }

    // contact object
    if (typeof section.content === "object") {
        return (
            <div className="text-white/85 space-y-2">
                <p className="font-medium">{section.content.organization}</p>
                <p className="flex items-center gap-3">
                    <span className="truncate">{section.content.email}</span>
                    <CopyButton textToCopy={section.content.email} />
                </p>
            </div>
        );
    }

    return null;
};

const CopyButton = ({ textToCopy }) => {

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(textToCopy);
            // small ephemeral feedback — accessible via aria-live
            const el = document.getElementById("copy-status");
            if (el) {
                el.textContent = "Copied!";
                setTimeout(() => (el.textContent = "Copy"), 1500);
            }
        } catch {
            // fallback
            alert("Copy failed. Please copy manually: " + textToCopy);
        }
    };

    return (
        <>
            <button
                onClick={handleCopy}
                className="ml-2 px-2 py-1 rounded-md bg-white/10 hover:bg-white/20 text-sm"
                aria-label={`Copy email ${textToCopy}`}
                id="copy-status"
            >
                Copy
            </button>
            <span
                role="status"
                aria-live="polite"
                className="sr-only"
            />
        </>
    );
};

const Toc = ({ sections }) => {
    return (
        <nav
            aria-label="Table of contents"
            className="hidden md:block sticky top-24 self-start w-56 shrink-0"
        >
            <div className="bg-white/3 p-4 rounded-xl border border-white/6">
                <h4 className="text-sm font-semibold text-white/90 mb-3">Contents</h4>
                <ul className="space-y-2 text-sm">
                    {sections.map((s) => (
                        <li key={s.id}>
                            <a
                                href={`#${s.id}`}
                                className="text-white/80 hover:text-white transition-colors"
                            >
                                {s.heading}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

const PrivacyPage = () => {
    const { title, lastUpdated, intro, sections } = PRIVACY_POLICY;

    // Create simple memoized tocSections to avoid re-renders
    const tocSections = useMemo(() => sections, [sections]);

    return (
        <main className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 flex justify-center px-4 py-10">
            <section className="w-full max-w-6xl">
                {/* Header */}
                <header className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-white">{title}</h1>
                    <p className="text-sm text-white/75 mt-2">Last updated: {lastUpdated}</p>
                </header>

                <div className="grid md:grid-cols-[220px_1fr] gap-8 items-start">
                    <Toc sections={tocSections} />

                    {/* Content Card */}
                    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 md:p-8 text-white shadow-2xl">
                        <p className="text-white/80 leading-relaxed mb-6">{intro}</p>

                        <div className="space-y-8">
                            {sections.map((section) => (
                                <section
                                    key={section.id}
                                    id={section.id}
                                    className="scroll-mt-24"
                                    aria-labelledby={`${section.id}-heading`}
                                >
                                    <h2
                                        id={`${section.id}-heading`}
                                        className="text-xl font-semibold text-white mb-3"
                                    >
                                        {section.heading}
                                    </h2>

                                    {section.note && (
                                        <p className="text-sm text-red-800 font-bold italic mb-2">{section.note}</p>
                                    )}

                                    <SectionContent section={section} />
                                </section>
                            ))}
                        </div>

                        <footer className="mt-8 border-t border-white/6 pt-6">
                            <p className="text-sm text-white/70">
                                If you have questions about this policy, contact{" "}
                                <button
                                    onClick={() =>
                                        navigator.clipboard.writeText(
                                            PRIVACY_POLICY.sections.find((s) => s.id === "contact").content
                                                .email
                                        )
                                    }
                                    className="underline"
                                >
                                    {PRIVACY_POLICY.sections.find((s) => s.id === "contact").content.email}
                                </button>
                                . We will respond as soon as we can.
                            </p>
                        </footer>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default PrivacyPage;
