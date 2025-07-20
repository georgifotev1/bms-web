import { UseFormRegisterReturn, UseFormSetValue } from 'react-hook-form';
import { SocialLink } from '../api/update-brand';
import * as React from 'react';
import { Label } from '@/components/ui/form';
import { Muted } from '@/components/typography';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useDebounce } from '@/utils/debounce';

interface SocialLinkProps {
    registration: Partial<UseFormRegisterReturn>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setValue: UseFormSetValue<any>;
    defaultValue: SocialLink[];
}
const SocialLinks = ({
    registration,
    setValue,
    defaultValue,
}: SocialLinkProps) => {
    const [socialLinks, setSocialLinks] = React.useState(defaultValue);
    const [isAddingLink, setIsAddingLink] = React.useState<boolean>(false);
    const [newLink, setNewLink] = React.useState<SocialLink>({
        platform: '',
        url: '',
    });

    const setPlatformValue = useDebounce(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setNewLink(prev => ({
                ...prev,
                platform: event.target.value,
            }));
        }
    );
    const setUrlValue = useDebounce(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setNewLink(prev => ({
                ...prev,
                url: event.target.value,
            }));
        }
    );

    const updateExistingLink = useDebounce((newUrl: string, index: number) => {
        setSocialLinks(prev =>
            prev.map((link, i) =>
                i === index ? { ...link, url: newUrl } : link
            )
        );
    });

    const cancelNewLink = () => {
        setNewLink({ platform: '', url: '' });
        setIsAddingLink(false);
    };

    const saveNewLink = () => {
        setSocialLinks(state => [...state, newLink]);
        cancelNewLink();
    };

    const isButtonDisabled = React.useMemo(() => {
        return !newLink.platform.trim() || !newLink.url.trim();
    }, [newLink.platform, newLink.url]);

    React.useEffect(() => {
        if (registration.name) {
            setValue(registration.name, socialLinks, { shouldDirty: true });
        }
    }, [socialLinks, registration.name, setValue]);

    return (
        <div className='py-6 space-y-6 lg:px-10'>
            <div className='mb-6'>
                <Label className='font-bold mb-1'>Social Links</Label>
                <Muted>
                    Drive Booking Page visitors to your site, socials and more.
                </Muted>
            </div>
            {socialLinks.length > 0 &&
                socialLinks.map((socialLink, index) => (
                    <div key={socialLink.platform + index}>
                        <Label className='mb-2'>{socialLink.platform}</Label>
                        <Input
                            type='text'
                            defaultValue={socialLink.url}
                            onChange={e =>
                                updateExistingLink(e.target.value, index)
                            }
                        />
                    </div>
                ))}
            {isAddingLink && (
                <div className='w-full flex gap-2 items-end'>
                    <div className='flex-1/2'>
                        <Label className='mb-2'>Platform</Label>
                        <Input
                            type='text'
                            placeholder='Facebook'
                            onChange={e => setPlatformValue(e)}
                        />
                    </div>
                    <div className='flex-1/2'>
                        <Label className='mb-2'>URL</Label>
                        <Input
                            type='text'
                            placeholder='www.facebook.com'
                            onChange={e => setUrlValue(e)}
                        />
                    </div>
                    <Button
                        variant='default'
                        disabled={isButtonDisabled}
                        onClick={saveNewLink}
                    >
                        Save
                    </Button>
                    <Button variant='secondary' onClick={cancelNewLink}>
                        Cancel
                    </Button>
                </div>
            )}

            <Button
                variant='secondary'
                disabled={isAddingLink}
                onClick={() => setIsAddingLink(true)}
            >
                Add More
            </Button>
        </div>
    );
};

export default SocialLinks;
