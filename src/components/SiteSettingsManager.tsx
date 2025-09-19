import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Upload, Save, Loader2 } from 'lucide-react';
import { useSiteSettings } from '@/hooks/useSiteSettings';
import { useToast } from '@/hooks/use-toast';

const SiteSettingsManager = () => {
  const { settings, loading, updateSettings, uploadImage } = useSiteSettings();
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState<'seo' | 'logo' | null>(null);
  
  const [formData, setFormData] = useState({
    site_title: '',
    site_description: '',
    meta_keywords: [] as string[],
  });

  React.useEffect(() => {
    if (settings) {
      setFormData({
        site_title: settings.site_title || '',
        site_description: settings.site_description || '',
        meta_keywords: settings.meta_keywords || [],
      });
    }
  }, [settings]);

  const handleSave = async () => {
    try {
      setSaving(true);
      await updateSettings(formData);
      toast({
        title: 'Settings Updated',
        description: 'Website settings have been saved successfully.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update settings. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (file: File, type: 'seo' | 'logo') => {
    try {
      setUploading(type);
      const imageUrl = await uploadImage(file, type === 'seo' ? 'seo-image' : 'logo');
      
      const updateKey = type === 'seo' ? 'seo_image_url' : 'logo_url';
      await updateSettings({ [updateKey]: imageUrl });
      
      toast({
        title: 'Image Updated',
        description: `${type === 'seo' ? 'SEO' : 'Logo'} image has been uploaded successfully.`,
      });
    } catch (error) {
      toast({
        title: 'Upload Failed',
        description: 'Failed to upload image. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setUploading(null);
    }
  };

  const handleKeywordsChange = (value: string) => {
    const keywords = value.split(',').map(k => k.trim()).filter(k => k.length > 0);
    setFormData({ ...formData, meta_keywords: keywords });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Website Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="site_title">Site Title</Label>
            <Input
              id="site_title"
              value={formData.site_title}
              onChange={(e) => setFormData({ ...formData, site_title: e.target.value })}
              placeholder="Your website title"
            />
          </div>
          
          <div>
            <Label htmlFor="site_description">Site Description</Label>
            <Textarea
              id="site_description"
              value={formData.site_description}
              onChange={(e) => setFormData({ ...formData, site_description: e.target.value })}
              placeholder="Your website description"
              rows={3}
            />
          </div>
          
          <div>
            <Label htmlFor="meta_keywords">Meta Keywords (comma-separated)</Label>
            <Input
              id="meta_keywords"
              value={formData.meta_keywords.join(', ')}
              onChange={(e) => handleKeywordsChange(e.target.value)}
              placeholder="keyword1, keyword2, keyword3"
            />
          </div>
          
          <Button onClick={handleSave} disabled={saving}>
            {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
            Save Settings
          </Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>SEO Image</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {settings?.seo_image_url && (
              <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                <img 
                  src={settings.seo_image_url} 
                  alt="SEO Preview" 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div>
              <Label htmlFor="seo-upload">Upload SEO Image</Label>
              <Input
                id="seo-upload"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleImageUpload(file, 'seo');
                }}
                disabled={uploading === 'seo'}
              />
              {uploading === 'seo' && (
                <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Uploading...
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Logo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {settings?.logo_url && (
              <div className="aspect-square bg-muted rounded-lg overflow-hidden max-w-32">
                <img 
                  src={settings.logo_url} 
                  alt="Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
            )}
            <div>
              <Label htmlFor="logo-upload">Upload Logo</Label>
              <Input
                id="logo-upload"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleImageUpload(file, 'logo');
                }}
                disabled={uploading === 'logo'}
              />
              {uploading === 'logo' && (
                <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Uploading...
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SiteSettingsManager;