# Why version control is essential to designers

Programmers I worked with in Aurumplanet used tools like [Trello](https://trello.com/en), [Atlassian](https://www.atlassian.com/) to improve their working environment. Among those [Git](https://en.wikipedia.org/wiki/Git) and [GitHub](https://github.com/) caught my eyes.

Designers go through infinite edit-feedback loop. However level of design file's version control is naive. For example, "Final.psd", "RealFinal.psd". These days lots of design software are equipped with version control system and some services like [Abstract](http://abstract.com/) offer design specific version control serivce. However in 2015, the concept of managing version was rare for designers.

After witnessing programmers managing versions for two years, I wanted to make start a business with design version control. It was not only because of my colleagues not using design version controls, but also **systematic environment is crucial for designers's product.** In August 2015, I set to work on design version control software based on Git.

# Git GUI for designers

![indegs 1.0 product image. (2016)](https://user-images.githubusercontent.com/12758512/82827994-1f6d9580-9eeb-11ea-92cc-d5ba7aaac22c.jpg)

Indegs is similar to other Git GUIs like [Github Desktop](https://desktop.github.com/), [Sourcetree](https://www.sourcetreeapp.com/), but has some features specific to designers' workflow. First, designs are hard to explain with words. Thus every commit(version), even if they are managed with messages it should have preview images. Also, design process is horizontal. They build drafts. All drafts are born with potential to be final work. Designers themselves do not know which draft or version will be selected as final, thus they have to keep comparing between drafts.

Indegs presents every version with preview images(visual commit message) and users can pick multiple versions and compare images side by side(visual diffing).

For this, Indegs uses [imagemagick](https://imagemagick.org/) to automatically generate Photoshop thumbnails on every commit. GUI was developed with [Electron](https://electronjs.org/) and used [React](https://reactjs.org) as view framework.

[[ youtube url="https://www.youtube.com/watch?v=ldecaFq3i3s" alt="Indegs 1.0 demo video. (2016)" ]]
