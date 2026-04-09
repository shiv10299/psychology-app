import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DocsPage.css';

const SECTIONS = [
  { id: 'overthinking', label: 'Overthinking', icon: '◌' },
  { id: 'human-types', label: 'Human Types', icon: '◉' },
  { id: 'emotions', label: 'Emotions', icon: '◎' },
  { id: 'behaviour', label: 'Human Behaviour', icon: '◈' },
  { id: 'books', label: 'Best Books', icon: '◇' },
  { id: 'research', label: 'Research Papers', icon: '△' },
];

export default function DocsPage() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('overthinking');

  const scrollTo = (id) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="docs">
      {/* Header */}
      <header className="docs__header">
        <button className="btn btn-ghost docs__back" onClick={() => navigate('/')}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Home
        </button>
        <div className="docs__header-title">◈ Psychology Library</div>
        <button className="btn btn-primary docs__quiz-btn" onClick={() => navigate('/personality-quiz')}>
          Know Your Type →
        </button>
      </header>

      <div className="docs__layout">
        {/* Sidebar */}
        <aside className="docs__sidebar">
          <div className="docs__sidebar-title">Contents</div>
          <nav className="docs__nav">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                className={`docs__nav-item ${activeSection === s.id ? 'docs__nav-item--active' : ''}`}
                onClick={() => scrollTo(s.id)}
              >
                <span className="docs__nav-icon">{s.icon}</span>
                {s.label}
              </button>
            ))}
          </nav>
          <div className="docs__sidebar-cta">
            <p>Curious about your personality?</p>
            <button className="btn btn-primary" style={{ width: '100%', fontSize: '0.82rem' }} onClick={() => navigate('/personality-quiz')}>
              Take the Quiz
            </button>
          </div>
        </aside>

        {/* Content */}
        <main className="docs__content">

          {/* ── Overthinking ─────────────────────────────────────── */}
          <section id="overthinking" className="docs__section">
            <div className="docs__section-badge" style={{ '--badge-color': 'var(--trait-overthinking)' }}>Psychology</div>
            <h1 className="docs__section-title">The Psychology of Overthinking</h1>
            <p className="docs__section-intro">
              Overthinking is not just "thinking too much." It's a psychological loop where the brain
              tries to gain control over uncertainty — but ends up trapping itself in endless cycles of analysis.
            </p>

            <div className="docs__card">
              <h3>What Actually Happens Inside the Brain</h3>
              <p>
                When you overthink, your brain's <strong>amygdala</strong> — the fear and threat detection center —
                becomes overactive. It releases stress hormones like cortisol, putting your body in a state of alert
                even when there's no real danger. This is called <strong>hypervigilance</strong>: your mind constantly
                scans for threats in conversations, decisions, and relationships.
              </p>
            </div>

            <h2 className="docs__h2">7 Core Psychological Patterns</h2>

            {[
              {
                num: '01', title: 'High Threat Detection (Hypervigilance)',
                text: 'The brain treats social situations and decisions like survival threats. It keeps asking: "What if something goes wrong?" or "What if they think badly of me?" — activating the amygdala and releasing cortisol unnecessarily.',
                tag: 'Anxiety'
              },
              {
                num: '02', title: 'Need for Control',
                text: 'Overthinkers hate uncertainty. Instead of accepting "I don\'t know what will happen," the mind simulates every possible scenario — building hypothetical chains of events that lead nowhere. The brain prefers predictable outcomes, so uncertainty feels physically uncomfortable.',
                tag: 'Control'
              },
              {
                num: '03', title: 'Rumination — Mental Replay',
                text: 'Replaying past events repeatedly. "Why did I say that?" "I should have replied differently." Psychology connects this with the Default Mode Network — a brain network that becomes overactive in overthinkers, constantly reopening past events like unfinished tasks.',
                tag: 'Rumination'
              },
              {
                num: '04', title: 'Emotional Sensitivity',
                text: 'Most overthinkers are emotionally sensitive. They read people deeply, notice small behavioral changes, and analyze tone and reactions. This sensitivity is a genuine strength — but without awareness, it turns into mental noise.',
                tag: 'Emotional'
              },
              {
                num: '05', title: 'Fear of Rejection or Loss',
                text: 'Many overthinkers subconsciously fear rejection, embarrassment, or losing someone important. This triggers constant checking: "Did I do something wrong?" "Does she still like me?" — especially when someone cares deeply.',
                tag: 'Attachment'
              },
              {
                num: '06', title: 'Decision Paralysis',
                text: 'Because the brain analyzes too many possibilities simultaneously, it struggles to choose. Psychology calls this Analysis Paralysis — the result is delayed decisions, regret after choosing, and constant second-guessing.',
                tag: 'Cognitive'
              },
              {
                num: '07', title: 'Physical Effects',
                text: 'Overthinking doesn\'t just stay in the head. Racing heart, mind going blank while talking, shaky voice, sweating, poor sleep, and fatigue are all physical symptoms — because the brain-body connection is deeply real.',
                tag: 'Physical'
              },
            ].map((item) => (
              <div key={item.num} className="docs__pattern-card">
                <div className="docs__pattern-num">{item.num}</div>
                <div className="docs__pattern-body">
                  <div className="docs__pattern-header">
                    <h3>{item.title}</h3>
                    <span className="docs__pattern-tag">{item.tag}</span>
                  </div>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}

            <h2 className="docs__h2">Types of Overthinkers</h2>
            <div className="docs__grid">
              {[
                { title: 'Past-Focused (The Ruminator)', desc: 'Replays old conversations. Linked with Depression patterns. Cannot let go of past mistakes.', color: 'var(--trait-overthinking)' },
                { title: 'Future-Focused (The Worrier)', desc: 'Constantly imagines future problems. Strongly linked with Generalized Anxiety Disorder.', color: 'var(--trait-emotional)' },
                { title: 'Social Overthinker', desc: 'Overanalyzes people\'s behavior and interactions. Often connects with Social Anxiety Disorder.', color: 'var(--trait-logic)' },
                { title: 'Decision Overthinker', desc: 'Struggles to make choices — even simple ones become major mental debates. Analysis Paralysis.', color: 'var(--trait-social)' },
                { title: 'Emotional Overthinker', desc: 'Thinks deeply about feelings and relationships. Highly sensitive to attachment and rejection signals.', color: 'var(--trait-confidence)' },
              ].map((t) => (
                <div key={t.title} className="docs__grid-card" style={{ '--card-accent': t.color }}>
                  <div className="docs__grid-card-dot" />
                  <h4>{t.title}</h4>
                  <p>{t.desc}</p>
                </div>
              ))}
            </div>

            <div className="docs__truth-box">
              <div className="docs__truth-label">Brutal Truth</div>
              <p>
                Overthinking is not intelligence. Many people believe "I overthink because I'm deep."
                In reality, overthinking means the brain is stuck in fear loops instead of acting.
                <strong> Thinking should lead to action, not endless mental simulations.</strong>
              </p>
            </div>

            <h2 className="docs__h2">Hidden Strengths of Overthinkers</h2>
            <div className="docs__strengths">
              {[
                { icon: '◉', title: 'Deep Emotional Intelligence', desc: 'Overthinkers are exceptionally good at reading emotions — subtle mood changes, unspoken feelings, social dynamics. Many writers, artists, and psychologists have this trait.' },
                { icon: '◈', title: 'Strong Problem Analysis', desc: 'Their naturally deep analysis makes overthinkers excellent at strategy, research, problem-solving, and creative thinking — in the right environment.' },
                { icon: '◎', title: 'Profound Empathy', desc: 'Because they feel emotions strongly, overthinkers understand others\' pain deeply, become supportive friends, and form genuine emotional bonds.' },
              ].map((s) => (
                <div key={s.title} className="docs__strength-card">
                  <span className="docs__strength-icon">{s.icon}</span>
                  <div>
                    <h4>{s.title}</h4>
                    <p>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="docs__divider" />

          {/* ── Human Types ──────────────────────────────────────── */}
          <section id="human-types" className="docs__section">
            <div className="docs__section-badge" style={{ '--badge-color': 'var(--trait-emotional)' }}>Personality</div>
            <h1 className="docs__section-title">Human Psychological Types</h1>
            <p className="docs__section-intro">
              Psychology doesn't treat all people the same. These patterns describe how humans tend to
              think, behave, and relate — not as labels, but as mirrors for self-understanding.
            </p>

            <h2 className="docs__h2">10 Common Behavioral Patterns</h2>
            {[
              { name: 'The Overthinker', icon: '◌', desc: 'Constantly analyzes situations, conversations, and decisions. Lives more in their head than in reality. Mental exhaustion is their most familiar companion.', linked: 'Rumination, Anxiety' },
              { name: 'The Empath', icon: '◉', desc: 'Absorbs and understands others\' emotions naturally. Feels what others feel. Often the emotional anchor in any group — but prone to burnout.', linked: 'Emotional Intelligence' },
              { name: 'The People Pleaser', icon: '◎', desc: 'Keeps everyone happy even at the cost of their own needs. Fear of disappointing others drives their decisions.', linked: 'Approval Seeking' },
              { name: 'The Perfectionist', icon: '◈', desc: 'Sets impossibly high standards. Even small mistakes feel catastrophic. When extreme, linked with OCPD.', linked: 'OCPD patterns' },
              { name: 'The Lone Wolf', icon: '◇', desc: 'Prefers independence and solitude. Recharges alone. Not antisocial — just selectively social.', linked: 'Introversion' },
              { name: 'The Narcissist', icon: '△', desc: 'Focuses heavily on self-image, admiration, and importance. Extreme forms classified as Narcissistic Personality Disorder.', linked: 'NPD' },
              { name: 'The Resilient Survivor', icon: '○', desc: 'Develops emotional strength after hardship. Adapts and continues forward. Turns pain into wisdom.', linked: 'Psychological Resilience' },
              { name: 'The Observer', icon: '□', desc: 'Quiet but highly perceptive. Analyzes people silently. Prefers to watch before speaking. Notices everything.', linked: 'Self-Awareness' },
              { name: 'The Deep Thinker', icon: '◆', desc: 'Constantly searches for meaning and deeper understanding. Questions everything others accept. Linked with existential psychology.', linked: 'Existential Psychology' },
              { name: 'The Intuitive Strategist', icon: '▽', desc: 'Thinks several steps ahead. Analyzes patterns and predicts outcomes. Sees connections others miss completely.', linked: 'Cognitive Psychology' },
            ].map((type) => (
              <div key={type.name} className="docs__type-card">
                <div className="docs__type-icon">{type.icon}</div>
                <div className="docs__type-body">
                  <div className="docs__type-header">
                    <h3>{type.name}</h3>
                    <span className="docs__type-linked">{type.linked}</span>
                  </div>
                  <p>{type.desc}</p>
                </div>
              </div>
            ))}

            <h2 className="docs__h2">7 Rare Personality Patterns</h2>
            <div className="docs__grid">
              {[
                { title: 'The Old Soul', desc: 'Feels mentally older than their age. Prefers wisdom over excitement. Comfortable with solitude and depth.' },
                { title: 'The Empathic Healer', desc: 'Naturally drawn to helping others emotionally. Friends come to them for comfort. High emotional intelligence.' },
                { title: 'The Independent Mind', desc: 'Resists blindly following the crowd. Forms their own opinions. Values intellectual freedom above social approval.' },
                { title: 'The Analytical Empath', desc: 'Combines deep emotional sensitivity with systematic thinking. Rare and powerful combination.' },
                { title: 'The Quiet Leader', desc: 'Leads without loudness. Influences through wisdom and example rather than authority or volume.' },
                { title: 'The Pattern Seeker', desc: 'Finds meaning and connections in everything. Often drawn to philosophy, science, or art.' },
                { title: 'The Wounded Healer', desc: 'Turns personal pain into the ability to deeply understand others. Often become therapists, writers, or mentors.' },
              ].map((t) => (
                <div key={t.title} className="docs__grid-card" style={{ '--card-accent': 'var(--accent)' }}>
                  <div className="docs__grid-card-dot" />
                  <h4>{t.title}</h4>
                  <p>{t.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="docs__divider" />

          {/* ── Emotions ─────────────────────────────────────────── */}
          <section id="emotions" className="docs__section">
            <div className="docs__section-badge" style={{ '--badge-color': 'var(--trait-emotional)' }}>Emotions</div>
            <h1 className="docs__section-title">The Science of Human Emotions</h1>
            <p className="docs__section-intro">
              Emotions are not weaknesses — they are complex neurological and psychological processes
              that shape every decision, relationship, and memory we have.
            </p>

            <div className="docs__card">
              <h3>What Are Emotions, Psychologically?</h3>
              <p>
                Emotions are multi-component responses involving <strong>physiological changes</strong> (heart rate,
                hormones), <strong>subjective feelings</strong> (what you experience internally),
                <strong> cognitive appraisal</strong> (how you interpret the situation), and
                <strong> behavioral tendencies</strong> (what you feel like doing). Paul Ekman identified
                6 universal basic emotions recognized across all cultures: happiness, sadness, fear, anger,
                surprise, and disgust.
              </p>
            </div>

            <h2 className="docs__h2">Key Emotional Concepts</h2>
            {[
              { title: 'Emotional Intelligence (EQ)', desc: 'The ability to recognize, understand, manage, and effectively use emotions — both your own and others\'. Research by Goleman (1995) suggests EQ is a stronger predictor of life success than IQ in many domains.' },
              { title: 'Emotional Regulation', desc: 'The capacity to manage and respond to emotional experiences in adaptive ways. Poor regulation leads to emotional flooding, outbursts, or suppression — all of which damage relationships and mental health.' },
              { title: 'Attachment Theory', desc: 'Developed by Bowlby, this theory explains how early emotional bonds with caregivers shape our relationship patterns throughout life — creating secure, anxious, avoidant, or disorganized attachment styles.' },
              { title: 'Emotional Contagion', desc: 'Emotions spread between people unconsciously. Empaths and overthinkers are especially susceptible — absorbing others\' emotional states without realizing it, leading to unexplained mood shifts.' },
              { title: 'Alexithymia', desc: 'A condition where a person has difficulty identifying and describing their own emotions. More common than most realize — affecting ~10% of the population and often going undiagnosed.' },
            ].map((item) => (
              <div key={item.title} className="docs__card docs__card--bordered">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </section>

          <div className="docs__divider" />

          {/* ── Human Behaviour ──────────────────────────────────── */}
          <section id="behaviour" className="docs__section">
            <div className="docs__section-badge" style={{ '--badge-color': 'var(--trait-logic)' }}>Behaviour</div>
            <h1 className="docs__section-title">Human Behaviour — Core Psychology</h1>
            <p className="docs__section-intro">
              Human behaviour is shaped by a complex interplay of biology, environment, past experiences,
              and social influences. No single theory explains it all.
            </p>

            <h2 className="docs__h2">Major Branches of Psychology</h2>
            <div className="docs__branches">
              {[
                { icon: '◈', name: 'Cognitive Psychology', desc: 'How the brain thinks, processes, and decides. Studies memory, attention, perception, and problem solving.' },
                { icon: '◉', name: 'Behavioral Psychology', desc: 'How environment shapes behavior through conditioning, rewards, and punishment. Pavlov and Skinner.' },
                { icon: '◎', name: 'Developmental Psychology', desc: 'How humans grow from birth through aging. Piaget\'s stages, Erikson\'s psychosocial development.' },
                { icon: '◇', name: 'Social Psychology', desc: 'How people behave in groups. Conformity, obedience, influence, attraction, and stereotypes.' },
                { icon: '△', name: 'Positive Psychology', desc: 'Focuses on strengths, happiness, and meaning — not just disorders. Seligman\'s PERMA model.' },
                { icon: '○', name: 'Evolutionary Psychology', desc: 'Explains human behavior through the lens of survival and natural selection. Why we fear, love, and compete.' },
              ].map((b) => (
                <div key={b.name} className="docs__branch-card">
                  <span className="docs__branch-icon">{b.icon}</span>
                  <div>
                    <h4>{b.name}</h4>
                    <p>{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="docs__h2">Fascinating Psychological Phenomena</h2>
            {[
              { title: 'Cognitive Dissonance', desc: 'The mental discomfort when your beliefs and actions conflict. People go to great lengths — including self-deception — to reduce this discomfort.' },
              { title: 'The Bystander Effect', desc: 'People are less likely to help in an emergency when others are present. Responsibility gets diluted across the group.' },
              { title: 'Confirmation Bias', desc: 'The tendency to search for and favor information that confirms existing beliefs — one of the most powerful distortions in human thinking.' },
              { title: 'The Dunning-Kruger Effect', desc: 'People with limited knowledge overestimate their competence, while experts often underestimate theirs. Humility correlates with genuine expertise.' },
              { title: 'Self-Fulfilling Prophecy', desc: 'A belief or expectation that causes itself to become true through the behavior it generates. Your expectations literally shape your reality.' },
            ].map((item) => (
              <div key={item.title} className="docs__card docs__card--bordered">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </section>

          <div className="docs__divider" />

          {/* ── Books ────────────────────────────────────────────── */}
          <section id="books" className="docs__section">
            <div className="docs__section-badge" style={{ '--badge-color': 'var(--accent)' }}>Reading List</div>
            <h1 className="docs__section-title">Essential Psychology Books</h1>
            <p className="docs__section-intro">
              These books have shaped modern psychological understanding. Especially recommended
              for overthinkers, deep feelers, and anyone serious about self-understanding.
            </p>

            <h2 className="docs__h2">For Overthinkers</h2>
            <div className="docs__books">
              {[
                { title: 'The Anxiety and Worry Workbook', author: 'Clark & Beck', year: '2011', desc: 'Evidence-based CBT techniques specifically for anxiety and overthinking loops. Practical and deeply researched.' },
                { title: 'Rewire Your Anxious Brain', author: 'Pittman & Karle', year: '2015', desc: 'Explains the neuroscience of anxiety and how to retrain the amygdala and cortex. Accessible and actionable.' },
                { title: 'The Highly Sensitive Person', author: 'Elaine Aron', year: '1996', desc: 'Groundbreaking research on high sensitivity as a trait — not a flaw. Essential reading for emotional overthinkers.' },
              ].map((b) => (
                <div key={b.title} className="docs__book-card">
                  <div className="docs__book-spine" />
                  <div className="docs__book-info">
                    <div className="docs__book-title">{b.title}</div>
                    <div className="docs__book-author">{b.author} · {b.year}</div>
                    <p className="docs__book-desc">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="docs__h2">For Deep Self-Understanding</h2>
            <div className="docs__books">
              {[
                { title: 'Man\'s Search for Meaning', author: 'Viktor Frankl', year: '1946', desc: 'Existential psychology masterpiece. Finding meaning through suffering — one of the most impactful books ever written.' },
                { title: 'Emotional Intelligence', author: 'Daniel Goleman', year: '1995', desc: 'The landmark work that defined emotional intelligence and its profound impact on success and relationships.' },
                { title: 'The Body Keeps the Score', author: 'Bessel van der Kolk', year: '2014', desc: 'How trauma lives in the body and mind — and paths to healing. Transformative for those with deep emotional histories.' },
                { title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', year: '2011', desc: 'Nobel Prize winner explores two systems of thinking. Essential for understanding cognitive biases and decision-making.' },
                { title: 'Attached', author: 'Levine & Heller', year: '2010', desc: 'The science of adult attachment styles — anxious, avoidant, secure. Changes how you understand every relationship.' },
              ].map((b) => (
                <div key={b.title} className="docs__book-card">
                  <div className="docs__book-spine" />
                  <div className="docs__book-info">
                    <div className="docs__book-title">{b.title}</div>
                    <div className="docs__book-author">{b.author} · {b.year}</div>
                    <p className="docs__book-desc">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="docs__divider" />

          {/* ── Research Papers ──────────────────────────────────── */}
          <section id="research" className="docs__section">
            <div className="docs__section-badge" style={{ '--badge-color': 'var(--trait-logic)' }}>Academic Research</div>
            <h1 className="docs__section-title">Key Research Papers</h1>
            <p className="docs__section-intro">
              Peer-reviewed studies that form the foundation of modern personality and emotion psychology.
            </p>

            <div className="docs__papers">
              {[
                { title: 'Ruminative Self-Focus and Negative Affect', authors: 'Nolen-Hoeksema, S.', journal: 'Journal of Personality and Social Psychology', year: '1991', desc: 'The foundational paper on rumination — establishing how repetitive self-focused thinking predicts and maintains depression.' },
                { title: 'Emotional Intelligence', authors: 'Salovey, P. & Mayer, J.D.', journal: 'Imagination, Cognition and Personality', year: '1990', desc: 'The original academic paper that first defined and conceptualized emotional intelligence as a measurable ability.' },
                { title: 'Attachment Theory and Close Relationships', authors: 'Hazan, C. & Shaver, P.', journal: 'Journal of Personality and Social Psychology', year: '1987', desc: 'Extended Bowlby\'s childhood attachment theory to adult romantic relationships — creating the field of adult attachment research.' },
                { title: 'The Big Five Inventory', authors: 'John, O.P. & Srivastava, S.', journal: 'Handbook of Personality', year: '1999', desc: 'The foundational paper for the Big Five personality model — Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism.' },
                { title: 'Cognitive Therapy and the Emotional Disorders', authors: 'Beck, A.T.', journal: 'International Universities Press', year: '1976', desc: 'Aaron Beck\'s landmark work establishing Cognitive Behavioral Therapy — the most evidence-supported psychological treatment today.' },
                { title: 'Psychological Resilience and Positive Emotion', authors: 'Fredrickson, B.L. et al.', journal: 'Journal of Personality and Social Psychology', year: '2003', desc: 'The broaden-and-build theory showing how positive emotions build lasting psychological resources and resilience.' },
              ].map((p) => (
                <div key={p.title} className="docs__paper-card">
                  <div className="docs__paper-icon">◈</div>
                  <div className="docs__paper-body">
                    <div className="docs__paper-title">"{p.title}"</div>
                    <div className="docs__paper-meta">{p.authors} · <em>{p.journal}</em> · {p.year}</div>
                    <p className="docs__paper-desc">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Bottom CTA */}
          <div className="docs__bottom-cta">
            <h2>Ready to discover your type?</h2>
            <p>Take our psychologically-informed quiz and get an AI-powered personality portrait.</p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="btn btn-primary" onClick={() => navigate('/quiz')}>Begin Full Assessment</button>
              <button className="btn btn-ghost" onClick={() => navigate('/personality-quiz')}>Quick Personality Quiz</button>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
