// Mobile menu toggle
document.getElementById('menuBtn').addEventListener('click', ()=>{
  const m = document.getElementById('mobile');
  m.style.display = (m.style.display === 'block') ? 'none' : 'block';
});

// Smooth scroll (closes mobile menu)
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', ()=>{
    const m = document.getElementById('mobile');
    if(m) m.style.display='none';
  });
});

// WhatsApp submit handlers
['quoteForm','quoteForm2'].forEach(id=>{
  const form = document.getElementById(id);
  if(form){
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      const inputs = form.querySelectorAll('input, textarea, select');
      // Extract values by placeholder where available
      const vals = {}
      inputs.forEach(inp=>{
        const key = (inp.getAttribute('name') || inp.getAttribute('id') || inp.getAttribute('placeholder') || 'field').trim();
        vals[key] = inp.value;
      });

      let lines = [];
      if(id==='quoteForm') {
        lines.push('📩 New Enquiry (Top Form)');
        lines.push('👤 Name: ' + (vals['Name'] || vals['Your Name'] || ''));
        lines.push('📞 Phone: ' + (vals['Mobile No.'] || vals['Phone'] || ''));
        lines.push('✉️ Email: ' + (vals['Email'] || ''));
        lines.push('📍 From: ' + (vals['From'] || vals['From City'] || ''));
        lines.push('📍 To: ' + (vals['To'] || vals['To City'] || ''));
      } else {
        lines.push('📩 New Enquiry (Bottom Form)');
        lines.push('👤 Name: ' + (vals['Your Name'] || vals['Name'] || ''));
        lines.push('📞 Phone: ' + (vals['Phone'] || vals['Mobile No.'] || ''));
        lines.push('📍 From: ' + (vals['From City'] || vals['From'] || ''));
        lines.push('📍 To: ' + (vals['To City'] || vals['To'] || ''));
        if(vals['Describe your move']) lines.push('📝 ' + vals['Describe your move']);
      }

      const text = encodeURIComponent(lines.join('\n'));
      const url = 'https://wa.me/918840039419?text=' + text;
      window.open(url, '_blank');
    });
  }
});