import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import erode from "@/assets/erd-pic.webp";
import chennai from "@/assets/chennai-pic.webp";
import { Download, FileText, Shield, Lock, Users, CheckCircle, ArrowUpRight, BadgeCheck, ClipboardCheck, Building2 } from 'lucide-react';
import Herobg from '@/assets/website/Zigma Night.jpg';


const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you for your message! We'll get back to you soon.");
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">

        {/* Page Header */}

        {/* <section className="section-dark-bg py-4">
          <div className="container-main text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              Contact Us
            </h1>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto">
              Get in touch with us for inquiries, partnerships, or to learn more about our services.
            </p>
          </div>
        </section> */}

         <section className="relative  overflow-hidden  text-white h-[90vh] flex items-center">
          <div
            className=" absolute inset-0 bg-cover"
            style={{ backgroundImage: `url(${Herobg})` }}
          />
          <div className="absolute inset-0 bg-black/35" />
          <div className="absolute inset-0 opacity-25 bg-[linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:28px_28px]" />
          <div className="absolute -top-24 -right-32 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-28 -left-24 h-80 w-80 rounded-full bg-black/10 blur-3xl" />

          <div className="relative max-w-7xl px-6 mx-auto text-center ">
            <div className="max-w-4xl">

              <h2 className="mt-1 text-3xl sm:text-2xl lg:text-5xl font-semibold leading-tight">
                Get in Touch With Us
              </h2>
              <p className="mt-6 text-lg text-white/80 leading-relaxed">
                Inquiries, partnerships, or to learn more about our sustainable solutions.</p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="section-padding">
          <div className="max-w-screen-xl mx-auto px-8">
            <div className="grid lg:grid-cols-2 gap-16">
              {/* Contact Info */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-8">
                  Get in Touch
                </h2>
                <div className="space-y-5">
                  <div className="contact-card">
                    <div className="contact-icon">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="contact-label">Office</p>
                      <h3 className="contact-title">Office Address</h3>
                      <p className="text-muted-foreground">
                        HO : 178, Indu Nagar, Palayapalayam, <br />
                        Perundurai Road, Erode, Tamilnadu - 638 011.
                      </p>
                    </div>
                  </div>

                  <div className="contact-card">
                    <div className="contact-icon">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="contact-label">Email</p>
                      <h3 className="contact-title">Email Us</h3>
                      <a href="mailto:careers@zigma.in" className="text-primary hover:underline">
                        careers@zigma.in
                      </a>
                    </div>
                  </div>

                  <div className="contact-card">
                    <div className="contact-icon">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="contact-label">Phone</p>
                      <h3 className="contact-title">Call Us</h3>
                      <a href="tel:+911234567890" className="text-primary hover:underline">
                        (91) 98943 26007
                      </a>
                    </div>
                  </div>

                  {/* <div className="contact-card">
                    <div className="contact-icon">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="contact-label">Hours</p>
                      <h3 className="contact-title">Working Hours</h3>
                      <p className="text-muted-foreground">
                        Monday - Saturday: 9:00 AM - 6:00 PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div> */}
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-card p-8 rounded-2xl border border-border shadow-xl shadow-black/10">
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Send Us a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Full Name *
                      </label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email Address *
                      </label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Phone Number
                      </label>
                      <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Subject *
                      </label>
                      <Input
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="How can we help?"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Message *
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your project or inquiry..."
                      rows={5}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Address Cards Section */}
        <section className="section-padding ">
          {/* <div className=" container-main"> */}
          <div className="container-main max-w-[1300px]">

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Erode Card */}
              <div className="relative rounded-2xl overflow-hidden shadow-lg">
                <img src={erode} alt="Erode Head Office" className="w-full h-96 object-cover" />
                <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Erode Head Office
                  </h3>
                  <p className="text-white/90">
                    [178, Indhu Nagar, palayapalayam,Perundurai Road,]<br />
                    Erode-638 012, Tamil Nadu, India
                  </p>
                  <a href="#" className="text-white/80 hover:text-white underline mt-2 inline-block">View on Map</a>
                </div>
              </div>

              {/* Chennai Card */}
              <div className="relative rounded-2xl overflow-hidden shadow-lg">
                <img src={chennai} alt="Chennai Office" className="w-full h-96 object-cover" />
                <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Chennai Office
                  </h3>
                  <p className="text-white/90">
                    [1st Floor, 'Greenways Towers',No.119, St.Mary's Rd, RA Puram, TrustPakkam, Abhiramapuram,]<br />
                    Chennai-600 018, Tamil Nadu, India
                  </p>
                  <a href="#" className="text-white/80 hover:text-white underline mt-2 inline-block">View on Map</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section
        <section className="h-96 bg-muted">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.5749093395584!2d77.30499631508256!3d28.642073782417!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfb39e0000001%3A0x70e1d8f4e5e5f8e!2sPatparganj%2C%20Delhi!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Office Location"
          />
        </section> */}
      </main>
      <Footer />



      <style>{`
        .contact-card {
          display: flex;
          gap: 16px;
          padding: 18px;
          border-radius: 16px;
          background: hsl(var(--card));
          border: 1px solid hsl(var(--border));
          box-shadow: 0 16px 36px rgba(15, 23, 42, 0.08);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .contact-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 20px 42px rgba(15, 23, 42, 0.12);
        }
        .contact-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: linear-gradient(135deg, hsl(var(--secondary)) 0%, hsl(var(--card)) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid hsl(var(--border));
          flex-shrink: 0;
        }
        .contact-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: hsl(var(--muted-foreground));
          margin-bottom: 4px;
        }
        .contact-title {
          font-size: 16px;
          font-weight: 700;
          color: hsl(var(--foreground));
          margin-bottom: 6px;
        }
      `}</style>
    </div>
  );
};

export default Contact;




