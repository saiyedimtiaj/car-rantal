import ContactInfo from "@/components/ContactInfo.tsx/ContactInfo";

const Contact = () => {
    return (
        <div>
            <div className="container mx-auto px-4">
                <ContactInfo />
            </div>
            <div className="w-full mt-20">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7379.579132437693!2d91.80761023559168!3d22.36157324065697!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30acd8f2d239536b%3A0xab56c2e2fecd08d4!2zS2h1bHNoaSBSZXNpZGVudGlhbCBBcmVhLCDgpprgpp_gp43gpp_gppfgp43gprDgpr7gpq4!5e0!3m2!1sbn!2sbd!4v1720515630282!5m2!1sbn!2sbd" height={450} style={{ border: 0 }} allowFullScreen loading="lazy" className="w-full" referrerPolicy="no-referrer-when-downgrade" />
            </div>
        </div>
    );
};

export default Contact;