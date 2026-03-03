import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import erode from "@/assets/erd-pic.webp";
import chennai from "@/assets/chennai-pic.webp";
import Herobg from '@/assets/website/Office Night.jpeg';


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
    <div className="min-h-screen bg-background ">
      <Header />
      <main className="scroll-pt-24 lg:scroll-pt-28 pt-20">


         <section className="relative overflow-hidden text-white min-h-[100svh] flex items-center scroll-mt-24 lg:scroll-mt-28">
          <div
            className=" absolute inset-0 bg-cover"
            style={{ backgroundImage: `url(${Herobg})` }}
          />
          <div className="absolute inset-0 bg-black/35" />
          <div className="absolute inset-0 opacity-25 bg-[linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:28px_28px]" />
          <div className="absolute -top-24 -right-32 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-28 -left-24 h-80 w-80 rounded-full bg-black/10 blur-3xl" />

          <div className="relative container-main section-padding text-center">
            <div className="max-w-4xl mx-auto">
              <div className="text-lg tracking-[0.35em] uppercase text-white/85 font-medium ">
            Let’s Connect
              </div>

              <h1 className="mt-1 text-3xl sm:text-2xl lg:text-5xl font-semibold leading-tight">
               Talk to Our Experts
              </h1>
              <p className="mt-6 text-lg max-w-2xl mx-auto text-white/80 leading-relaxed">
              For business queries, collaboration opportunities, or to understand our sustainable solutions, get in touch with us.</p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="section-padding">
          <div className="container-main">
            <div className="grid lg:grid-cols-2 gap-16">
              {/* Contact Info */}
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-8">
                  Get in Touch
                </h2>
                <div className="space-y-5 ">
                  <div className="flex gap-4 p-[18px] bg-card border rounded-lg border-border shadow-[0_16px_36px_rgba(15,23,42,0.08)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_20px_42px_rgba(15,23,42,0.12)]">
                    <div className="w-11 h-11 bg-gradient-to-br from-secondary to-card rounded-lg border border-border flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-primary " />
                    </div>
                    <div>
                      {/* <p className="text-[11px] font-bold tracking-[0.22em] uppercase text-muted-foreground mb-1">Office</p> */}
                      <h3 className="text-base font-bold text-foreground mb-1.5">Office Address</h3>
                      <p className="text-muted-foreground">
                        HO : 178, Indu Nagar, Palayapalayam, <br />
                        Perundurai Road, Erode, Tamilnadu - 638 011.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-[18px] bg-card border rounded-lg border-border shadow-[0_16px_36px_rgba(15,23,42,0.08)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_20px_42px_rgba(15,23,42,0.12)]">
                    <div className="w-11 h-11 bg-gradient-to-br from-secondary to-card  rounded-lg border border-border flex items-center justify-center shrink-0">
                      {/* <Mail className="w-5 h-5 text-primary border-rounded-2xl" /> */}
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      {/* <p className="text-[11px] font-bold tracking-[0.22em] uppercase text-muted-foreground mb-1">Email</p> */}
                      <h3 className="text-base font-bold text-foreground mb-1.5">Email Us</h3>
                      <a href="mailto:careers@zigma.in" className="text-primary hover:underline">
                        careers@zigma.in
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4 p-[18px] bg-card border rounded-lg border-border shadow-[0_16px_36px_rgba(15,23,42,0.08)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_20px_42px_rgba(15,23,42,0.12)]">
                    <div className="w-11 h-11 bg-gradient-to-br from-secondary to-card rounded-lg border border-border flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      {/* <p className="text-[11px] font-bold tracking-[0.22em] uppercase text-muted-foreground mb-1">Phone</p> */}
                      <h3 className="text-base font-bold text-foreground mb-1.5">Call Us</h3>
                      <a href="tel:+911234567890" className="text-primary hover:underline">
                        (91) 98943 26007
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-card p-8 border border-border shadow-xl shadow-black/10 rounded-lg">
                <h2 className="text-3xl font-bold text-foreground mb-6">
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
                        placeholder="Enter your name"
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
                        placeholder="Enter your email"
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
                        placeholder="Enter your phone number"
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
        <section className="section-padding">
          {/* <div className=" container-main"> */}
          <div className="container-main">

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Erode Card */}
              <div className="relative overflow-hidden shadow-lg rounded-lg">
                <img src={erode} alt="Erode Head Office" className="w-full h-96 object-cover" />
                <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-6">
                  <h3 className="text-3xl font-bold text-white mb-2">
                    Erode Head Office
                  </h3>
                  <p className="text-lg text-white/90 ">
                    178, Indhu Nagar, palayapalayam,Perundurai Road,<br />
                    Erode-638 012, Tamil Nadu, India
                  </p>
                  <a href="#" className="text-white/80 hover:text-white underline mt-2 inline-block">View on Map</a>
                </div>
              </div>

              {/* Chennai Card */}
              <div className="relative overflow-hidden shadow-lg rounded-lg">
                <img src={chennai} alt="Chennai Office" className="w-full h-96 object-cover" />
                <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-6">
                  <h3 className="text-3xl font-bold text-white mb-2">
                    Chennai Office
                  </h3>
                  <p className=" text-lg text-white/90">
                    1st Floor, 'Greenways Towers',No.119, St.Mary's Rd, RA Puram, TrustPakkam, Abhiramapuram,<br />
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
    </div>
  );
};

export default Contact;




