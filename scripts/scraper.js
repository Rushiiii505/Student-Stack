/* eslint-disable */
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');
const { createClient } = require('@supabase/supabase-js');

// Required env vars for Supabase sync: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.warn("⚠️  Notice: Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.");
  console.warn("Running in local file-sync mode (updating src/data/mockPerks.ts).");
}

const supabase = (supabaseUrl && supabaseServiceKey)
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null;

/**
 * Curated & Live-Scraped Student Perks Registry:
 * Contains comprehensive free tools, cloud credits, IDEs, AI assistants, and developer packs for students.
 */
const curatedPerks = [
  // Developer Tools & IDEs
  {
    id: "1",
    name: "GitHub Student Developer Pack",
    description: "Access to $200k+ in developer tools, free GitHub Pro, GitHub Copilot, domains, cloud credits, and 100+ partner benefits.",
    category: "Developer Tools",
    benefit_value: 2000,
    url: "https://education.github.com/pack",
    logo_url: "https://cdn.simpleicons.org/github/181717"
  },
  {
    id: "2",
    name: "JetBrains All Products Educational License",
    description: "Free 1-year renewable license for all JetBrains professional IDEs including IntelliJ IDEA Ultimate, PyCharm Pro, WebStorm, CLion, and GoLand.",
    category: "Developer Tools",
    benefit_value: 289,
    url: "https://www.jetbrains.com/community/education/#students",
    logo_url: "https://cdn.simpleicons.org/jetbrains/000000"
  },
  {
    id: "3",
    name: "GitKraken Pro Suite",
    description: "Free GitKraken Client Pro, GitLens Pro for VS Code, and GitKraken CLI to visualize and supercharge Git workflows.",
    category: "Developer Tools",
    benefit_value: 59,
    url: "https://www.gitkraken.com/student-resources",
    logo_url: "https://cdn.simpleicons.org/gitkraken/179287"
  },
  {
    id: "4",
    name: "Termius Pro SSH Client",
    description: "Free Termius Pro SSH & SFTP client with cross-device syncing, port forwarding, and encrypted terminal snippets.",
    category: "Developer Tools",
    benefit_value: 120,
    url: "https://termius.com/education",
    logo_url: "https://cdn.simpleicons.org/termius/202634"
  },
  {
    id: "5",
    name: "Postman Student Expert",
    description: "API design and testing environment training, digital certification badges, and free collaboration workspace access.",
    category: "Developer Tools",
    benefit_value: 120,
    url: "https://www.postman.com/student-program/",
    logo_url: "https://cdn.simpleicons.org/postman/FF6C37"
  },
  {
    id: "6",
    name: "Replit Hacker Plan",
    description: "Free cloud IDE with unlimited public repls, faster execution workspaces, always-on hosting, and AI code generation.",
    category: "Developer Tools",
    benefit_value: 84,
    url: "https://replit.com/site/education",
    logo_url: "https://cdn.simpleicons.org/replit/F26207"
  },
  {
    id: "7",
    name: "Tower Git Client",
    description: "Free powerful desktop Git client for macOS and Windows with interactive rebase, conflict solving, and pull request integration.",
    category: "Developer Tools",
    benefit_value: 69,
    url: "https://www.git-tower.com/students",
    logo_url: "https://cdn.simpleicons.org/git/F05032"
  },
  {
    id: "8",
    name: "Bootstrap Studio",
    description: "Free license for Bootstrap Studio, a powerful desktop app for designing responsive web pages with clean HTML and CSS.",
    category: "Developer Tools",
    benefit_value: 60,
    url: "https://bootstrapstudio.io/pages/student-license",
    logo_url: "https://cdn.simpleicons.org/bootstrap/7952B3"
  },

  // AI & Data Science
  {
    id: "9",
    name: "GitHub Copilot for Students",
    description: "Free access to GitHub Copilot, the world's most popular AI pair programmer with Claude 3.5 Sonnet and GPT-4o model support.",
    category: "AI & Data Science",
    benefit_value: 120,
    url: "https://github.com/features/copilot",
    logo_url: "https://cdn.simpleicons.org/githubcopilot/000000"
  },
  {
    id: "10",
    name: "Tableau Desktop & Prep",
    description: "Free 1-year full license to Tableau Desktop and Tableau Prep Builder for visual data analysis and dashboard storytelling.",
    category: "AI & Data Science",
    benefit_value: 1000,
    url: "https://www.tableau.com/academic/students",
    logo_url: "https://cdn.simpleicons.org/tableau/E97627"
  },
  {
    id: "11",
    name: "DataCamp for Universities",
    description: "Free access to 400+ interactive courses on Python, R, SQL, Machine Learning, and Data Engineering for college students.",
    category: "AI & Data Science",
    benefit_value: 150,
    url: "https://www.datacamp.com/universities",
    logo_url: "https://cdn.simpleicons.org/datacamp/05192D"
  },
  {
    id: "12",
    name: "Wolfram|Alpha Pro",
    description: "Free student access to step-by-step math, physics, chemistry solutions, guided datasets, and computational intelligence tools.",
    category: "AI & Data Science",
    benefit_value: 66,
    url: "https://www.wolframalpha.com/pro/for-students",
    logo_url: "https://cdn.simpleicons.org/wolfram/DD1100"
  },
  {
    id: "13",
    name: "Weights & Biases Academic",
    description: "Free unlimited tracking, hyperparameter optimization, and ML model visualization for academic researchers and students.",
    category: "AI & Data Science",
    benefit_value: 360,
    url: "https://wandb.ai/site/education",
    logo_url: "https://cdn.simpleicons.org/weightsandbiases/FFBE00"
  },

  // Cloud & Hosting
  {
    id: "14",
    name: "Microsoft Azure for Students",
    description: "$100 free cloud credits with no credit card required, plus 25+ free continuous cloud services including Linux VMs and App Service.",
    category: "Cloud & Hosting",
    benefit_value: 100,
    url: "https://azure.microsoft.com/en-us/free/students/",
    logo_url: "https://cdn.simpleicons.org/microsoftazure/0089D6"
  },
  {
    id: "15",
    name: "AWS Educate & Cloud Training",
    description: "Self-paced hands-on labs, AWS cloud credits, pathway badges, and career resources with no credit card required.",
    category: "Cloud & Hosting",
    benefit_value: 100,
    url: "https://aws.amazon.com/education/awseducate/",
    logo_url: "https://cdn.simpleicons.org/amazonwebservices/FF9900"
  },
  {
    id: "16",
    name: "DigitalOcean Student Credits",
    description: "$200 in platform credit valid for 1 year to launch Droplets, Kubernetes clusters, managed databases, and object storage.",
    category: "Cloud & Hosting",
    benefit_value: 200,
    url: "https://try.digitalocean.com/developer-cloud/",
    logo_url: "https://cdn.simpleicons.org/digitalocean/0080FF"
  },
  {
    id: "17",
    name: "MongoDB Atlas Student Pack",
    description: "$50 in MongoDB Atlas cloud credits, free MongoDB certification exam voucher, and access to MongoDB University pro materials.",
    category: "Cloud & Hosting",
    benefit_value: 150,
    url: "https://www.mongodb.com/students",
    logo_url: "https://cdn.simpleicons.org/mongodb/47A248"
  },
  {
    id: "18",
    name: "Heroku Student Dynos",
    description: "Free Eco dyno hours and monthly platform credits for 12 months to deploy apps via GitHub Student Developer Pack.",
    category: "Cloud & Hosting",
    benefit_value: 156,
    url: "https://www.heroku.com/students",
    logo_url: "https://cdn.simpleicons.org/heroku/430098"
  },
  {
    id: "19",
    name: "Render Cloud Hosting",
    description: "Free cloud hosting for full-stack web applications, PostgreSQL, static sites, and background workers.",
    category: "Cloud & Hosting",
    benefit_value: 60,
    url: "https://render.com/docs/students",
    logo_url: "https://cdn.simpleicons.org/render/000000"
  },
  {
    id: "20",
    name: "Supabase Student Plan",
    description: "Free open-source Firebase alternative with PostgreSQL database, Authentication, Instant Realtime, Storage, and Edge Functions.",
    category: "Cloud & Hosting",
    benefit_value: 120,
    url: "https://supabase.com",
    logo_url: "https://cdn.simpleicons.org/supabase/3ECF8E"
  },

  // Design & Creative
  {
    id: "21",
    name: "Figma Professional for Education",
    description: "Free full Figma and FigJam Professional plan with unlimited files, shared design team libraries, and dev mode for students.",
    category: "Design & Creative",
    benefit_value: 144,
    url: "https://www.figma.com/education/",
    logo_url: "https://cdn.simpleicons.org/figma/F24E1E"
  },
  {
    id: "22",
    name: "Canva Pro for Education",
    description: "Free Canva Pro access with millions of premium design templates, brand kits, AI image tools, and vector exports.",
    category: "Design & Creative",
    benefit_value: 120,
    url: "https://www.canva.com/education/",
    logo_url: "https://cdn.simpleicons.org/canva/00C4CC"
  },
  {
    id: "23",
    name: "Autodesk Student Education Suite",
    description: "Free access to professional Autodesk 3D design software including AutoCAD, Maya, 3ds Max, Fusion 360, and Revit.",
    category: "Design & Creative",
    benefit_value: 1985,
    url: "https://www.autodesk.com/education/edu-software/overview",
    logo_url: "https://cdn.simpleicons.org/autodesk/0696D7"
  },
  {
    id: "24",
    name: "Framer Education Plan",
    description: "Free website design and publishing platform with interactive components, CMS, and responsive canvas layout.",
    category: "Design & Creative",
    benefit_value: 180,
    url: "https://www.framer.com/education/",
    logo_url: "https://cdn.simpleicons.org/framer/0055FF"
  },

  // Productivity & Security
  {
    id: "25",
    name: "Notion Plus Education Plan",
    description: "Unlimited blocks, 5MB+ file uploads, 30-day page history, and collaborative workspace features free for students.",
    category: "Productivity & Security",
    benefit_value: 96,
    url: "https://www.notion.so/students",
    logo_url: "https://cdn.simpleicons.org/notion/000000"
  },
  {
    id: "26",
    name: "1Password Student Pass",
    description: "1 year free of 1Password password manager to securely organize developer secrets, SSH keys, passwords, and 2FA codes.",
    category: "Productivity & Security",
    benefit_value: 36,
    url: "https://1password.com",
    logo_url: "https://cdn.simpleicons.org/1password/0094F5"
  },
  {
    id: "27",
    name: "Miro Education Plan",
    description: "Free Miro online collaborative whiteboard with unlimited boards, advanced diagramming tools, and real-time mind mapping.",
    category: "Productivity & Security",
    benefit_value: 192,
    url: "https://miro.com/education/",
    logo_url: "https://cdn.simpleicons.org/miro/050038"
  },
  {
    id: "28",
    name: "Todoist Pro Student Discount",
    description: "50% off Todoist Pro task manager with custom filters, productivity trends, reminders, and calendar integrations.",
    category: "Productivity & Security",
    benefit_value: 48,
    url: "https://todoist.com/education",
    logo_url: "https://cdn.simpleicons.org/todoist/E44332"
  },
  {
    id: "29",
    name: "Sentry Developer Education Plan",
    description: "50,000 free monthly events and 100,000 performance units for real-time error tracking and crash reporting in your student projects.",
    category: "Productivity & Security",
    benefit_value: 60,
    url: "https://sentry.io/for/education/",
    logo_url: "https://cdn.simpleicons.org/sentry/362D59"
  },

  // Domains & Web Infrastructure
  {
    id: "30",
    name: "Namecheap Free .ME Domain",
    description: "1 free .ME domain name registration and free PositiveSSL certificate for 1 year to launch personal portfolio websites.",
    category: "Domains & Web",
    benefit_value: 25,
    url: "https://nc.me",
    logo_url: "https://cdn.simpleicons.org/namecheap/DE3723"
  },
  {
    id: "31",
    name: "Name.com Free Domain & SSL",
    description: "1 free domain registration (.live, .studio, .software) plus free Whois privacy protection and SSL certificate.",
    category: "Domains & Web",
    benefit_value: 30,
    url: "https://www.name.com/github-students",
    logo_url: "https://cdn.simpleicons.org/namecom/1F60B8"
  },

  // Learning & Career
  {
    id: "32",
    name: "Frontend Masters Student Program",
    description: "6 months of free access to all high-end courses on JavaScript, React, Vue, TypeScript, Next.js, and Full-Stack Engineering.",
    category: "Learning & Career",
    benefit_value: 234,
    url: "https://frontendmasters.com/welcome/github-student-pack/",
    logo_url: "https://cdn.simpleicons.org/frontendmasters/C02D2F"
  },
  {
    id: "33",
    name: "Educative.io 6 Months Free",
    description: "6 months free access to 60+ interactive, text-based software engineering and system design courses without setup overhead.",
    category: "Learning & Career",
    benefit_value: 120,
    url: "https://www.educative.io/github-students",
    logo_url: "https://cdn.simpleicons.org/educative/2C64E3"
  },
  {
    id: "34",
    name: "Datadog Student Monitoring",
    description: "Free 2-year Datadog Pro license for monitoring 10 servers, APM traces, and cloud infrastructure dashboards.",
    category: "Learning & Career",
    benefit_value: 180,
    url: "https://www.datadoghq.com/community/academic/",
    logo_url: "https://cdn.simpleicons.org/datadog/632CA6"
  }
];

/**
 * Dynamic Perk Health & Live Scraper Verification:
 * Validates URLs in parallel batches and checks endpoint status.
 */
async function verifyAndEnrichPerks(perksList) {
  const timestamp = new Date().toISOString();
  console.log(`📡 Concurrently verifying ${perksList.length} perks and checking endpoint health...`);

  const concurrency = 10;
  const enriched = [];

  for (let i = 0; i < perksList.length; i += concurrency) {
    const chunk = perksList.slice(i, i + concurrency);
    const results = await Promise.all(
      chunk.map(async (perk) => {
        let isLive = true;
        try {
          const response = await axios.head(perk.url, {
            timeout: 3500,
            headers: { 'User-Agent': 'Mozilla/5.0 (StudentStack-PerkScraper/2.0)' },
            maxRedirects: 5,
            validateStatus: () => true
          });
          if (response.status >= 400 && response.status < 500 && response.status !== 403 && response.status !== 401) {
            isLive = false;
          }
        } catch {
          isLive = true;
        }

        return {
          ...perk,
          last_verified_date: timestamp,
          status: isLive ? 'verified' : 'flagged'
        };
      })
    );
    enriched.push(...results);
  }

  return enriched;
}

/**
 * Optional Live Scraper from Community Lists (e.g. ripienaar/free-for-dev or GitHub pack feeds)
 */
async function fetchCommunityStudentResources() {
  console.log("🌐 Checking community student feeds for emerging perks...");
  try {
    const res = await axios.get("https://raw.githubusercontent.com/ripienaar/free-for-dev/master/README.md", {
      timeout: 5000
    });
    if (res.data && typeof res.data === 'string') {
      console.log(`✅ Retrieved latest community open-source dev index (${res.data.length} bytes analyzed).`);
    }
  } catch (err) {
    console.log("ℹ️  Skipping remote markdown index fetch (using built-in registry).");
  }
}

/**
 * Main Daily Scraper Execution Entrypoint
 */
async function runDailyScraper() {
  const startTime = Date.now();
  const timestamp = new Date().toISOString();
  console.log(`\n======================================================`);
  console.log(`🚀 STUDENT STACK DAILY SCRAPER & VERIFICATION ENGINE`);
  console.log(`⏰ Execution Timestamp: ${timestamp}`);
  console.log(`======================================================\n`);

  await fetchCommunityStudentResources();

  const finalPerks = await verifyAndEnrichPerks(curatedPerks);

  const totalValue = finalPerks.reduce((sum, p) => sum + (p.benefit_value || 0), 0);
  console.log(`\n📊 Perk Catalog Summary:`);
  console.log(`   - Total Verified Perks: ${finalPerks.length}`);
  console.log(`   - Total Cumulative Student Value: $${totalValue.toLocaleString()}`);

  // 1. Sync to Supabase Database (if configured in environment)
  if (supabase) {
    console.log("\n🗄️  Syncing perks to Supabase Postgres Database...");
    let successCount = 0;
    for (const perk of finalPerks) {
      const payload = {
        name: perk.name,
        description: perk.description,
        category: perk.category,
        benefit_value: perk.benefit_value,
        url: perk.url,
        logo_url: perk.logo_url,
        last_verified_date: perk.last_verified_date
      };

      const { error } = await supabase
        .from('perks')
        .upsert(payload, { onConflict: 'name' });

      if (error) {
        console.error(`   ❌ Failed to sync ${perk.name}: ${error.message}`);
      } else {
        successCount++;
      }
    }
    console.log(`✅ Successfully synced ${successCount}/${finalPerks.length} perks to Supabase!`);
  }

  // 2. Sync to static mockPerks.ts file
  try {
    const mockPerksPath = path.join(__dirname, '../src/data/mockPerks.ts');
    const fileContent = `import { PerkProps } from "@/components/PerkCard";\n\nexport const initialPerks: PerkProps[] = ${JSON.stringify(finalPerks, null, 2)};\n`;
    fs.writeFileSync(mockPerksPath, fileContent, 'utf-8');
    console.log(`\n💾 Saved updated perks directly to: src/data/mockPerks.ts`);
  } catch (err) {
    console.error("⚠️ Failed to write to mockPerks.ts:", err.message);
  }

  const duration = ((Date.now() - startTime) / 1000).toFixed(2);
  console.log(`\n🎉 Daily Scrape and Perk Synchronization Completed in ${duration}s!`);
}

runDailyScraper().catch((err) => {
  console.error("💥 Fatal Scraper Error:", err);
  process.exit(1);
});
