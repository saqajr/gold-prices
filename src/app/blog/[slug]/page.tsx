// gold-prices-portal/src/app/blog/[slug]/page.tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { blogs } from '@/lib/blogs';
import { ArrowRight, Calendar, Tag } from 'lucide-react';

export async function generateStaticParams() {
    return blogs.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const blog = blogs.find((b) => b.slug === slug);
    if (!blog) return { title: 'غير موجود' };
    return {
        title: `${blog.title} | مدونة الذهب`,
        description: blog.description,
    };
}

export default async function BlogPostPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const blog = blogs.find((b) => b.slug === slug);

    if (!blog) notFound();

    const related = blogs.filter((b) => b.slug !== slug).slice(0, 2);

    return (
        <div className="space-y-12 animate-in fade-in duration-700">
            {/* Back Link */}
            <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-slate-500 hover:text-gold font-black text-sm transition-colors"
            >
                <ArrowRight size={16} />
                العودة للمدوّنة
            </Link>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
                {/* Main Article */}
                <article className="xl:col-span-2 space-y-8">
                    {/* Hero image */}
                    <div className="relative h-80 rounded-[2rem] overflow-hidden shadow-sm border border-slate-100">
                        <img
                            src={blog!.image}
                            alt={blog!.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                        <div className="absolute bottom-6 right-6">
                            <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black text-gold border border-gold/10">
                                {blog!.tag}
                            </span>
                        </div>
                    </div>

                    {/* Meta */}
                    <div className="flex items-center gap-4 text-slate-400 text-sm font-bold">
                        <div className="flex items-center gap-1.5">
                            <Calendar size={14} />
                            <span>{blog!.date}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Tag size={14} />
                            <span>{blog!.tag}</span>
                        </div>
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl md:text-4xl font-black text-slate-900 leading-snug">{blog!.title}</h1>

                    {/* Content */}
                    <div className="prose prose-lg max-w-none text-right text-slate-700 font-bold leading-loose whitespace-pre-line">
                        {blog!.content}
                    </div>
                </article>

                {/* Sidebar */}
                <aside className="space-y-6">
                    <div className="bg-slate-50 rounded-[2rem] p-7 border border-slate-100">
                        <h3 className="font-black text-slate-900 text-lg mb-6">مقالات ذات صلة</h3>
                        <div className="space-y-5">
                            {related.map((r) => (
                                <Link key={r.slug} href={`/blog/${r.slug}`} className="group flex gap-4 items-start">
                                    <div className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 bg-slate-100">
                                        <img src={r.image} alt={r.title} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <p className="font-black text-slate-800 text-sm leading-snug group-hover:text-gold transition-colors">{r.title}</p>
                                        <p className="text-slate-400 text-xs mt-1">{r.date}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}
