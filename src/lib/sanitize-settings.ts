export const LEGACY_SITE_NAMES_REGEX = /radar\s*co|colombia\s*(en\s*)?debate|tolima\s*informa|noticias\s*hoy|newsportal/i;

export function sanitizeSiteName(name?: string | null): string {
  if (!name || LEGACY_SITE_NAMES_REGEX.test(name)) {
    return 'Urabá Informa';
  }
  return name;
}

export function sanitizeSettings(settings: Record<string, string>): Record<string, string> {
  const result: Record<string, string> = { ...settings };

  // site_name
  if (!result.site_name || LEGACY_SITE_NAMES_REGEX.test(result.site_name)) {
    result.site_name = 'Urabá Informa';
  }

  // seo_title
  if (!result.seo_title || LEGACY_SITE_NAMES_REGEX.test(result.seo_title)) {
    result.seo_title = 'Urabá Informa - Noticias de Urabá, Antioquia y Actualidad';
  }

  // site_description & seo_description
  if (!result.site_description || LEGACY_SITE_NAMES_REGEX.test(result.site_description)) {
    result.site_description = 'Tu portal de noticias digital de confianza en Urabá y Colombia';
  }
  if (!result.seo_description || LEGACY_SITE_NAMES_REGEX.test(result.seo_description)) {
    result.seo_description = 'Portal de noticias digital con las últimas noticias de Urabá, Antioquia, Colombia, deportes, política, cultura y economía.';
  }

  // site_logo (remove legacy placeholders or previous brand logos like Radar CO)
  if (
    result.site_logo &&
    (result.site_logo.includes('seed=NH') ||
      result.site_logo.includes('seed=CD') ||
      LEGACY_SITE_NAMES_REGEX.test(result.site_logo) ||
      !result.site_logo.toLowerCase().includes('uraba'))
  ) {
    result.site_logo = '';
  }

  // site_favicon
  if (
    !result.site_favicon ||
    result.site_favicon.includes('seed=NH') ||
    result.site_favicon.includes('seed=CD')
  ) {
    result.site_favicon = 'https://api.dicebear.com/9.x/initials/svg?seed=UI&backgroundColor=c0392b';
  }

  return result;
}
