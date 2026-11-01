export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto p-6 mt-10 prose prose-invert prose-blue">
      <h1 className="text-3xl font-bold mb-6 text-white">About Me</h1>
      
      <p>
        My name is Yalew Abera. I am a freelance professional with 3 year of experience working in design. Over the years, I have had to navigate the complexities of self-employment—from calculating estimated quarterly taxes to figuring out the best way to invoice international clients.
      </p>

      <p>
        I created the Freelancer Accounting Stack because I realized that most accounting advice is written for small businesses with employees, not for solo professionals. I have personally tested the tools reviewed on this site—including FreshBooks and QuickBooks—to manage my own day-to-day freelance operations. My goal is to provide practical, easy-to-understand guidance so you can manage your finances, avoid overpaying on taxes, and get back to doing the work you actually enjoy.
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-4 text-white">Our Review Methodology</h2>
      
      <p>
        The software recommendations on this site are based on firsthand experience and practical testing. When I review an accounting tool, I look at its real-world usability for a solo operator: How easy is it to send an invoice? Does the bank feed accurately categorize expenses? Is the mobile app useful for tracking mileage? 
      </p>
      
      <p>
        I do not accept payment in exchange for positive reviews. 
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-4 text-white">Affiliate Disclosure</h2>

      <p>
        To keep this site running and provide free content, I participate in affiliate programs. This means that if you click on a link to a software tool (like FreshBooks or QuickBooks) and decide to sign up, I may earn a commission at no additional cost to you. This does not affect the price you pay or the opinions expressed in my articles. I only recommend tools that I believe will provide genuine value to other freelancers.
      </p>

      <p className="mt-8 text-sm text-gray-400">
        If you have any questions about my experience or the tools I recommend, please visit the <a href="/contact" className="text-blue-400 underline">Contact Page</a>.
      </p>
    </main>
  );
}